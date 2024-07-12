import React from 'react'
import { Typography, Box } from '@mui/material'

const PrivacyPage: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <Typography variant="h1" sx={{ marginBottom: '20px' }}>
                Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                Your privacy is important to us. This privacy policy outlines
                the types of personal information we receive and collect when
                you use our website and how we safeguard your information.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                We may collect personal information such as your name, email
                address, and phone number when you fill out a contact form or
                subscribe to our newsletter. This information will only be used
                for the purpose of communicating with you and providing the
                services you requested.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                We may also collect non-personal information such as your IP
                address, browser type, and operating system to analyze trends,
                administer the site, track user&apos;s movement, and gather
                broad demographic information for aggregate use. This
                information is not linked to any personally identifiable
                information.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                We use cookies to personalize content and ads, to provide social
                media features, and to analyze our traffic. We also share
                information about your use of our site with our social media,
                advertising, and analytics partners who may combine it with
                other information that you&apos;ve provided to them or that
                they&apos;ve collected from your use of their services.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                Our website may contain links to other websites. Please be aware
                that we are not responsible for the privacy practices of such
                other sites. We encourage our users to be aware when they leave
                our site and to read the privacy statements of each and every
                website that collects personally identifiable information. This
                privacy policy applies solely to information collected by this
                website.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                If you have any questions or concerns about our privacy policy,
                please contact us.
            </Typography>
        </Box>
    )
}

export default PrivacyPage
