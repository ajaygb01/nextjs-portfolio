import React from 'react'
import { Breadcrumbs, Link } from '@mui/material'

interface BreadcrumbsProps {
    path: { id: string; name: string }[]
    handleBreadcrumbClick: (index: number) => void
}

const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({
    path,
    handleBreadcrumbClick,
}) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => handleBreadcrumbClick(-1)}>
                Root
            </Link>
            {path.map((folder, index) => (
                <Link
                    key={folder.id}
                    color="inherit"
                    onClick={() => handleBreadcrumbClick(index)}
                >
                    {folder.name}
                </Link>
            ))}
        </Breadcrumbs>
    )
}

export default CustomBreadcrumbs
