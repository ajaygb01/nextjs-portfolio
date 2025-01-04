import Navbar from '@/pages/components/Navbar'
import CustomBreadcrumbs from '@/pages/components/Breadcrumbs'
import FileExplorer from '@/pages/components/fileExplorer'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Box, Button, Typography, Paper } from '@mui/material'

interface GoogleDriveFile {
    id: string
    name: string
    mimeType: string
}

const UploadPage: React.FC = () => {
    const { data: session } = useSession()
    const [file, setFile] = useState<File | null>(null)
    const [files, setFiles] = useState<GoogleDriveFile[]>([])
    const [currentFolder, setCurrentFolder] = useState<string | null>(null)
    const [path, setPath] = useState<{ id: string; name: string }[]>([])
    const [taxFolder, setTaxFolder] = useState<GoogleDriveFile | null>(null)

    useEffect(() => {
        if (session?.accessToken) {
            listFiles(session.accessToken, currentFolder)
        }
    }, [session, currentFolder])

    const listFiles = async (accessToken: string, folderId: string | null) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/drive/v3/files?q='${folderId ?? 'root'}'+in+parents`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            const data = await response.json()
            if (response.ok) {
                if (folderId === null) {
                    const currentYear = new Date().getFullYear()
                    const taxFolderName = `${session?.user?.name} Tax ${currentYear}`
                    const taxFolder: GoogleDriveFile | undefined =
                        data.files.find(
                            (file: GoogleDriveFile) =>
                                file.name === taxFolderName &&
                                file.mimeType ===
                                    'application/vnd.google-apps.folder'
                        )
                    setTaxFolder(taxFolder || null)
                }
                setFiles(data.files || [])
            } else {
                console.error('Error listing files:', data.error)
            }
        } catch (error) {
            console.error('Error listing files:', error)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload')
            return
        }

        const accessToken = session?.accessToken
        if (!accessToken) {
            alert('User not authenticated')
            return
        }

        try {
            const currentYear = new Date().getFullYear()
            const folderName = `${session?.user?.name} Tax ${currentYear}`

            // Create a new folder
            const folderResponse = await fetch(
                'https://www.googleapis.com/drive/v3/files',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: folderName,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [currentFolder ?? 'root'],
                    }),
                }
            )
            const folderData = await folderResponse.json()
            if (!folderResponse.ok) {
                throw new Error(folderData.error)
            }

            const folderId = folderData.id

            // Set folder permissions
            await setPermissions(accessToken, folderId)

            // Upload the file to the new folder
            const metadata = new Blob(
                [
                    JSON.stringify({
                        name: file.name,
                        parents: [folderId],
                    }),
                ],
                { type: 'application/json' }
            )

            const formData = new FormData()
            formData.append('metadata', metadata)
            formData.append('file', file)

            const uploadResponse = await fetch(
                `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData,
                }
            )

            const uploadData = await uploadResponse.json()
            if (uploadResponse.ok) {
                alert('File uploaded successfully!')
                await setPermissions(accessToken, uploadData.id)
                listFiles(accessToken, null) // Refresh the file list at the root level
            } else {
                alert('Error uploading file: ' + uploadData.error)
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Error uploading file')
        }
    }

    const setPermissions = async (accessToken: string, fileId: string) => {
        try {
            const response = await fetch('/api/setPermissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken, fileId }),
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error)
            }
            console.log('Permission set for file:', fileId)
        } catch (error) {
            console.error('Error setting permissions:', error)
        }
    }

    const handleFolderClick = (folderId: string, folderName: string) => {
        setCurrentFolder(folderId)
        setPath([...path, { id: folderId, name: folderName }])
    }

    const handleBreadcrumbClick = (index: number) => {
        const newPath = path.slice(0, index + 1)
        setPath(newPath)
        setCurrentFolder(newPath[newPath.length - 1]?.id ?? null)
    }

    if (!session) {
        return (
            <Box>
                <Navbar />
                <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                    <Typography variant="h5" gutterBottom>
                        Please log in to upload your tax file.
                    </Typography>
                </Box>
            </Box>
        )
    }

    const isGoogleUser = session?.user?.email?.endsWith('@gmail.com')

    return (
        <Box>
            <Navbar />
            <Box sx={{ padding: '20px' }}>
                <CustomBreadcrumbs
                    path={path}
                    handleBreadcrumbClick={handleBreadcrumbClick}
                />
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Upload Your Tax File
                    </Typography>
                    {isGoogleUser && (
                        <Typography variant="h6" gutterBottom>
                            Logged in with Google
                        </Typography>
                    )}
                    <Paper
                        elevation={3}
                        sx={{ padding: '20px', marginTop: '20px' }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Select a file to upload:
                        </Typography>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ marginBottom: '20px' }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleUpload}
                            sx={{ marginTop: '20px' }}
                        >
                            Upload to Google Drive
                        </Button>
                    </Paper>
                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Files in Google Drive:
                        </Typography>
                        {currentFolder === null && taxFolder ? (
                            <FileExplorer
                                files={[taxFolder]}
                                handleFolderClick={handleFolderClick}
                            />
                        ) : (
                            <FileExplorer
                                files={files}
                                handleFolderClick={handleFolderClick}
                            />
                        )}
                        {currentFolder === null && !taxFolder && (
                            <Typography variant="h6" gutterBottom>
                                No tax folder found. Please upload your tax
                                files.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UploadPage
