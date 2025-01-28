import React, { useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'

interface PaymentStrategyProps {
    loans: Loan[]
    onCalculate: (
        strategy: 'snowball' | 'avalanche',
        additionalPayment: number
    ) => void
}

interface Loan {
    name: string
    amount: number
    interest: number
    payment: number
}

const PaymentStrategy: React.FC<PaymentStrategyProps> = ({
    loans,
    onCalculate,
}) => {
    const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>(
        'snowball'
    )
    const [additionalPayment, setAdditionalPayment] = useState<number>(0)

    const handleStrategyChange = (
        event: React.MouseEvent<HTMLElement>,
        newStrategy: 'snowball' | 'avalanche'
    ) => {
        if (newStrategy !== null) {
            setStrategy(newStrategy)
        }
    }

    const handleAdditionalPaymentChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAdditionalPayment(parseFloat(e.target.value) || 0)
    }

    const handleCalculate = () => {
        onCalculate(strategy, additionalPayment)
    }

    return (
        <Box sx={{ p: 4, borderRadius: 2, backgroundColor: '#f5f5f5', mt: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Payment Strategy
            </Typography>
            <ToggleButtonGroup
                value={strategy}
                exclusive
                onChange={handleStrategyChange}
                aria-label="payment strategy"
                sx={{ mb: 2 }}
            >
                <ToggleButton value="snowball" aria-label="snowball strategy">
                    Snowball
                </ToggleButton>
                <ToggleButton value="avalanche" aria-label="avalanche strategy">
                    Avalanche
                </ToggleButton>
            </ToggleButtonGroup>
            <TextField
                fullWidth
                margin="normal"
                label="Additional Payment"
                type="number"
                variant="outlined"
                value={additionalPayment}
                onChange={handleAdditionalPaymentChange}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleCalculate}
            >
                Calculate
            </Button>
        </Box>
    )
}

export default PaymentStrategy
