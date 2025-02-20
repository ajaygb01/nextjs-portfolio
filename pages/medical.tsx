import { useEffect, useState } from 'react'
import {
    Container,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    AppBar,
    Toolbar,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from '@mui/material'

type Patient = { id: string; name: string; age: number }
type MedicalData = {
    patient: Patient
    records: { date: string; diagnosis: string; prescription: string }[]
    labResults: { test: string; date: string; result: string }[]
    appointments: { date: string; doctor: string; type: string }[]
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333',
        },
    },
})

export default function MedicalDashboard() {
    const [patients, setPatients] = useState<Patient[]>([])
    const [selectedPatient, setSelectedPatient] = useState<MedicalData | null>(
        null
    )

    useEffect(() => {
        fetch('/api/data?endpoint=patients')
            .then((res) => res.json())
            .then(setPatients)
    }, [])

    const fetchPatientDetails = (id: string) => {
        fetch(`/api/data?endpoint=patient&id=${id}`)
            .then((res) => res.json())
            .then(setSelectedPatient)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            MediDash
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container sx={{ mt: 4, flex: 1 }}>
                    {/* Patients Table */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Patients List
                            </Typography>
                            <Table sx={{ border: '1px solid #ddd' }}>
                                <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {patients.map((patient) => (
                                        <TableRow
                                            key={patient.id}
                                            onClick={() =>
                                                fetchPatientDetails(patient.id)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <TableCell>
                                                {patient.name}
                                            </TableCell>
                                            <TableCell>{patient.age}</TableCell>
                                            <TableCell>View Details</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Patient Details */}
                    {selectedPatient && (
                        <>
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Patient Summary
                                    </Typography>
                                    <Typography>
                                        Name: {selectedPatient.patient.name}
                                    </Typography>
                                    <Typography>
                                        Age: {selectedPatient.patient.age}
                                    </Typography>
                                    <Typography>
                                        ID: {selectedPatient.patient.id}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Medical Records
                                    </Typography>
                                    <Table sx={{ border: '1px solid #ddd' }}>
                                        <TableHead
                                            sx={{ backgroundColor: '#e3f2fd' }}
                                        >
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Diagnosis</TableCell>
                                                <TableCell>
                                                    Prescription
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedPatient.records.map(
                                                (record, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {record.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {record.diagnosis}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                record.prescription
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Lab Results
                                    </Typography>
                                    <Table sx={{ border: '1px solid #ddd' }}>
                                        <TableHead
                                            sx={{ backgroundColor: '#e3f2fd' }}
                                        >
                                            <TableRow>
                                                <TableCell>Test</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Result</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedPatient.labResults.map(
                                                (result, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {result.test}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.result}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Upcoming Appointments
                                    </Typography>
                                    <Table sx={{ border: '1px solid #ddd' }}>
                                        <TableHead
                                            sx={{ backgroundColor: '#e3f2fd' }}
                                        >
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Doctor</TableCell>
                                                <TableCell>Type</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedPatient.appointments.map(
                                                (appt, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {appt.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {appt.doctor}
                                                        </TableCell>
                                                        <TableCell>
                                                            {appt.type}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </Container>
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                        textAlign: 'center',
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            MediDash - Your Health, Our Priority
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {'© '}
                            {new Date().getFullYear()}
                            {' MediDash. All rights reserved.'}
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
