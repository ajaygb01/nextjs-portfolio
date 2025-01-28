import { useState } from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    CssBaseline,
    ThemeProvider,
    createTheme,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AmortizationTable from '@/app/component/snow/AmortizationTable'
import LoanChart from '@/app/component/snow/LoanChart'
import PaymentStrategy from '@/app/component/snow/PaymentStrategy'

interface Loan {
    name: string
    amount: number
    interest: number
    payment: number
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
})

export default function Home() {
    const [loan, setLoan] = useState<Loan>({
        name: '',
        amount: 0,
        interest: 0,
        payment: 0,
    })
    const [loans, setLoans] = useState<Loan[]>([])
    const [view, setView] = useState<'table' | 'chart'>('table')
    const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>(
        'snowball'
    )
    const [additionalPayment, setAdditionalPayment] = useState<number>(0)
    const [payoffSchedule, setPayoffSchedule] = useState<
        {
            name: string
            payoffDate: string
            totalPaid: number
            reduction: number
        }[]
    >([])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoan((prevLoan) => ({ ...prevLoan, [name]: value }))
    }

    const handleAddLoan = () => {
        if (
            loan.name &&
            loan.amount > 0 &&
            loan.interest > 0 &&
            loan.payment > 0
        ) {
            setLoans((prevLoans) => [
                ...prevLoans,
                {
                    ...loan,
                    amount: parseFloat(loan.amount.toString()),
                    interest: parseFloat(loan.interest.toString()),
                    payment: parseFloat(loan.payment.toString()),
                },
            ])
            setLoan({ name: '', amount: 0, interest: 0, payment: 0 })
        }
    }

    const handleDeleteLoan = (index: number) => {
        setLoans((prevLoans) => prevLoans.filter((_, i) => i !== index))
    }

    const handleClearForm = () => {
        setLoan({ name: '', amount: 0, interest: 0, payment: 0 })
    }

    const handleViewChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: 'table' | 'chart'
    ) => {
        if (newView !== null) {
            setView(newView)
        }
    }

    const handleCalculate = (
        selectedStrategy: 'snowball' | 'avalanche',
        additionalPayment: number
    ) => {
        setStrategy(selectedStrategy)
        setAdditionalPayment(additionalPayment)

        const sortedLoans = [...loans].sort((a, b) => {
            if (selectedStrategy === 'snowball') {
                return a.amount - b.amount
            } else {
                return b.interest - a.interest
            }
        })

        const payoffSchedule: {
            name: string
            payoffDate: string
            totalPaid: number
            reduction: number
        }[] = []
        let currentDate = new Date()
        let totalPaid = 0

        sortedLoans.forEach((loan) => {
            let balance = loan.amount
            let monthlyPayment = loan.payment + additionalPayment
            let loanTotalPaid = 0

            while (balance > 0) {
                const interest = (balance * loan.interest) / 100 / 12
                const principal = Math.min(monthlyPayment - interest, balance)
                balance -= principal
                loanTotalPaid += monthlyPayment
                currentDate.setMonth(currentDate.getMonth() + 1)
            }

            totalPaid += loanTotalPaid
            payoffSchedule.push({
                name: loan.name,
                payoffDate: currentDate.toLocaleDateString(),
                totalPaid: loanTotalPaid,
                reduction: loanTotalPaid - loan.amount,
            })
        })

        setPayoffSchedule(payoffSchedule)
    }

    const calculateTotalInterest = (loan: Loan) => {
        let balance = loan.amount
        let totalInterest = 0
        while (balance > 0) {
            const interest = (balance * loan.interest) / 100 / 12
            const principal = Math.min(loan.payment - interest, balance)
            balance -= principal
            totalInterest += interest
        }
        return totalInterest
    }

    const totalMonthlyPayment = loans.reduce(
        (total, loan) => total + loan.payment,
        0
    )
    const totalAmountPaid = loans.reduce(
        (total, loan) => total + loan.amount + calculateTotalInterest(loan),
        0
    )
    const totalInterestPaid = loans.reduce(
        (total, loan) => total + calculateTotalInterest(loan),
        0
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                    p: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    align="center"
                                    gutterBottom
                                >
                                    Loan Calculator
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Loan Name"
                                        name="name"
                                        type="text"
                                        variant="outlined"
                                        value={loan.name}
                                        onChange={handleInput}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Loan Amount"
                                        name="amount"
                                        type="number"
                                        variant="outlined"
                                        value={loan.amount}
                                        onChange={handleInput}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Interest Rate (%)"
                                        name="interest"
                                        type="number"
                                        variant="outlined"
                                        value={loan.interest}
                                        onChange={handleInput}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Monthly Payment"
                                        name="payment"
                                        type="number"
                                        variant="outlined"
                                        value={loan.payment}
                                        onChange={handleInput}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        onClick={handleAddLoan}
                                    >
                                        Add Loan
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ mt: 2 }}
                                        onClick={handleClearForm}
                                    >
                                        Clear Form
                                    </Button>
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    align="center"
                                    sx={{ mt: 4 }}
                                >
                                    Total Monthly Payment: $
                                    {totalMonthlyPayment.toFixed(2)}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    align="center"
                                    sx={{ mt: 2 }}
                                >
                                    Total Amount Paid: $
                                    {totalAmountPaid.toFixed(2)}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    align="center"
                                    sx={{ mt: 2 }}
                                >
                                    Total Interest Paid: $
                                    {totalInterestPaid.toFixed(2)}
                                </Typography>
                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    aria-label="view toggle"
                                    sx={{ mt: 4 }}
                                >
                                    <ToggleButton
                                        value="table"
                                        aria-label="table view"
                                    >
                                        Amortization Table
                                    </ToggleButton>
                                    <ToggleButton
                                        value="chart"
                                        aria-label="chart view"
                                    >
                                        Loan Chart
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                {loans.map((loan, index) => (
                                    <Box key={index} sx={{ mt: 4 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h2"
                                                gutterBottom
                                            >
                                                {loan.name}
                                            </Typography>
                                            <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                    handleDeleteLoan(index)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                        {view === 'table' ? (
                                            <AmortizationTable
                                                loanAmount={loan.amount}
                                                interestRate={loan.interest}
                                                monthlyPayment={loan.payment}
                                            />
                                        ) : (
                                            <LoanChart
                                                loanAmount={loan.amount}
                                                interestRate={loan.interest}
                                                monthlyPayment={loan.payment}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PaymentStrategy
                                loans={loans}
                                onCalculate={handleCalculate}
                            />
                            {payoffSchedule.length > 0 && (
                                <Paper
                                    elevation={6}
                                    sx={{ p: 4, borderRadius: 2, mt: 4 }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        align="center"
                                        gutterBottom
                                    >
                                        Payoff Schedule
                                    </Typography>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Loan Name
                                                    </TableCell>
                                                    <TableCell>
                                                        Payoff Date
                                                    </TableCell>
                                                    <TableCell>
                                                        Total Paid
                                                    </TableCell>
                                                    <TableCell>
                                                        Reduction
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {payoffSchedule.map(
                                                    (schedule, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {schedule.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    schedule.payoffDate
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {schedule.totalPaid.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {schedule.reduction.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
