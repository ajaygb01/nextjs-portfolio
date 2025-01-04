import React from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

interface FileCardProps {
    file: {
        id: string
        name: string
        mimeType: string
    }
    handleFolderClick: (folderId: string, folderName: string) => void
}

const FileCard: React.FC<FileCardProps> = ({ file, handleFolderClick }) => {
    if (!file) {
        return null
    }

    return (
        <Card>
            <CardContent>
                {file.mimeType === 'application/vnd.google-apps.folder' ? (
                    <FolderIcon fontSize="large" />
                ) : (
                    <InsertDriveFileIcon fontSize="large" />
                )}
                <Typography variant="h6" component="div">
                    {file.name}
                </Typography>
            </CardContent>
            <CardActions>
                {file.mimeType === 'application/vnd.google-apps.folder' ? (
                    <Button
                        size="small"
                        onClick={() => handleFolderClick(file.id, file.name)}
                    >
                        Open
                    </Button>
                ) : (
                    <Button
                        size="small"
                        href={`https://drive.google.com/file/d/${file.id}`}
                        target="_blank"
                    >
                        View
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default FileCard
