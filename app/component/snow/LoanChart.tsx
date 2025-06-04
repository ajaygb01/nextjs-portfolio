// @ts-nocheck
import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { Typography } from '@mui/material'

interface LoanChartProps {
    loanAmount: number
    interestRate: number
    monthlyPayment: number
}

const LoanChart: React.FC<LoanChartProps> = ({
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
        <>
            <Typography variant="body1" component="div" sx={{ p: 2 }}>
                End Date: {endDate.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" component="div" sx={{ p: 2 }}>
                Total Amount Paid: ${totalAmountPaid.toFixed(2)}
            </Typography>
            <Typography variant="body1" component="div" sx={{ p: 2 }}>
                Total Interest Paid: ${totalInterest.toFixed(2)}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={amortization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="principal"
                        stroke="#8884d8"
                    />
                    <Line type="monotone" dataKey="interest" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="balance" stroke="#ff7300" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default LoanChart
