import React, { useState, useEffect } from 'react'
import { TextField, Box, Button } from '@mui/material'
import {
    Contact,
    FormValues,
    initialFormValues,
} from '@/app/state/initialState'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ChatIcon from '@mui/icons-material/Chat'
import EmailIcon from '@mui/icons-material/Email'

interface ContactFormProps {
    handleChange: (key: keyof FormValues, value: any) => void
}

const ContactForm: React.FC<ContactFormProps> = ({ handleChange }) => {
    const [contacts, setContacts] = useState<Contact[]>([
        initialFormValues.contact[0],
    ])
    const data = [
        {
            app: 'LinkedIn Link',
            icon: <LinkedInIcon />,
            link: '',
        },
        {
            app: 'Whatsapp Link',
            icon: <ChatIcon />,
            link: '',
        },
        {
            app: 'Email ID',
            icon: <EmailIcon />,
            link: '',
        },
    ]
    useEffect(() => {
        setContacts(data)
    }, [])

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

    const handleContactChange = (index: number, value: string) => {
        const newContacts = [...contacts]
        newContacts[index].link = value
        setContacts(newContacts)
        handleChange('contact', newContacts)
    }
    const handleClear = () => {
        const clearedContacts = contacts.map((contact) => ({
            ...contact,
            link: '',
        }))
        setContacts(clearedContacts)
        handleChange('contact', clearedContacts)
    }

    return (
        <Box sx={{ margin: '10px 0' }}>
            {contacts.map((item, index) => (
                <TextField
                    key={index}
                    label={item.app}
                    value={item.link}
                    sx={{ margin: 1 }}
                    onChange={(e) => handleContactChange(index, e.target.value)}
                />
            ))}
            <Button onClick={handleClear}>Clear</Button>
        </Box>
    )
}

export default ContactForm
