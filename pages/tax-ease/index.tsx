import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const TaxEaseHome: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to TaxEase
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Your simplified tax management solution
            </Typography>
            <Box sx={{ marginTop: '30px' }}>
                <Link href="/tax-ease/speak-with-consultants" passHref>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: 2 }}
                    >
                        Speak with Consultants
                    </Button>
                </Link>
                <Link href="/tax-ease/upload" passHref>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ margin: 2 }}
                    >
                        Upload Tax File
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default TaxEaseHome
