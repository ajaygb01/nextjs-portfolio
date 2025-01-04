import React from 'react'
import { Grid } from '@mui/material'
import FileCard from './Filecard'

interface FileExplorerProps {
    files: {
        id: string
        name: string
        mimeType: string
    }[]
    handleFolderClick: (folderId: string, folderName: string) => void
}

const FileExplorer: React.FC<FileExplorerProps> = ({
    files = [],
    handleFolderClick,
}) => {
    return (
        <Grid container spacing={2}>
            {files.map((file) => (
                <Grid item xs={12} sm={6} md={4} key={file.id}>
                    <FileCard
                        file={file}
                        handleFolderClick={handleFolderClick}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default FileExplorer
