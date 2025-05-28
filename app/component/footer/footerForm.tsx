import React, { useState, useEffect } from 'react'
import { TextField, Box } from '@mui/material'
import { Footer, FormValues, initialFormValues } from '@/app/state/initialState'

interface FooterFormProps {
    handleChange: (key: keyof FormValues, value: any) => void
}

const FooterForm: React.FC<FooterFormProps> = ({ handleChange }) => {
    const [footer, setFooter] = useState<Footer>(initialFormValues.footer)

    // Memoize the 'data' object
    const data = React.useMemo(() => ({
        year: new Date().getFullYear(),
        companyName: '',
    }), []); // Empty dependency array means it's created once

    useEffect(() => {
        setFooter(data)
    }, [data]) // Add 'data' to the dependency array

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
