// @ts-nocheck
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material'

interface AmortizationTableProps {
    loanAmount: number
    interestRate: number
    monthlyPayment: number
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({
    loanAmount,
    interestRate,
    monthlyPayment,
}) => {
    const calculateAmortization = () => {
        const amortization = []
        let balance = loanAmount
        let totalInterest = 0
        let month = 0

        while (balance > 0 && month < 360) {
            const interest = (balance * interestRate) / 100 / 12
            const principal = Math.min(monthlyPayment - interest, balance)
            balance -= principal
            totalInterest += interest
            amortization.push({
                month: month + 1,
                principal,
                interest,
                balance,
            })
            month++
        }

        return { amortization, totalInterest }
    }

    const { amortization, totalInterest } = calculateAmortization()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + amortization.length)
    const totalAmountPaid = loanAmount + totalInterest

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Amortization Schedule
            </Typography>
            <Typography variant="body1" component="div" sx={{ p: 2 }}>
                End Date: {endDate.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" component="div" sx={{ p: 2 }}>
                Total Amount Paid: ${totalAmountPaid.toFixed(2)}
            </Typography>
            <Typography variant="body1" component="div" sx={{ p: 2 }}>
                Total Interest Paid: ${totalInterest.toFixed(2)}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Principal</TableCell>
                        <TableCell>Interest</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {amortization.map((row) => (
                        <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell>${row.principal.toFixed(2)}</TableCell>
                            <TableCell>${row.interest.toFixed(2)}</TableCell>
                            <TableCell>${row.balance.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AmortizationTable
