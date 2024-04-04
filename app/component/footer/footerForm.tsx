import React, { useState, useEffect } from 'react'
import { TextField, Box } from '@mui/material'
import { Footer, FormValues, initialFormValues } from '@/app/state/initialState'

interface FooterFormProps {
    handleChange: (key: keyof FormValues, value: any) => void
}

const FooterForm: React.FC<FooterFormProps> = ({ handleChange }) => {
    const [footer, setFooter] = useState<Footer>(initialFormValues.footer)
    const data = {
        year: new Date().getFullYear(),
        companyName: '',
    }
    useEffect(() => {
        setFooter(data)
    }, [])

    const handleFooterChange = (key: keyof Footer, value: string) => {
        const newFooter = { ...footer, [key]: value }
        setFooter(newFooter)
        handleChange('footer', newFooter)
    }

    return (
        <Box sx={{ margin: '10px 0' }}>
            <TextField
                label="Company Name"
                value={footer.companyName}
                sx={{ margin: 1 }}
                onChange={(e) =>
                    handleFooterChange('companyName', e.target.value)
                }
            />
        </Box>
    )
}

export default FooterForm
