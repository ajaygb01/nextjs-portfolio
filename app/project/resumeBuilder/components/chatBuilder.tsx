import * as React from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

interface Message {
    sender: 'user' | 'bot'
    text: string
}

interface ChatBuilderState {
    messages: Message[]
    currentInput: string
}

const questions: Message[] = [
    { sender: 'bot', text: 'What is your full name?' },
    { sender: 'bot', text: 'What is your email?' },
    { sender: 'bot', text: 'What is your phone number?' },
    { sender: 'bot', text: 'What is your address?' },
    { sender: 'bot', text: 'What is your LinkedIn profile URL?' },
    { sender: 'bot', text: 'What is your personal website URL?' },
    { sender: 'bot', text: 'What is the name of your school?' },
    { sender: 'bot', text: 'What degree did you obtain?' },
    { sender: 'bot', text: 'What was your field of study?' },
    { sender: 'bot', text: 'What year did you graduate?' },
    { sender: 'bot', text: 'What was your GPA?' },
    { sender: 'bot', text: 'What is your job title?' },
    { sender: 'bot', text: 'What is the name of your company?' },
    { sender: 'bot', text: 'Where is your job located?' },
    { sender: 'bot', text: 'When did you start your job?' },
    { sender: 'bot', text: 'When did you end your job?' },
    { sender: 'bot', text: 'What was your job description?' },
    { sender: 'bot', text: 'What achievements did you have at your job?' },
    { sender: 'bot', text: 'What skills do you have?' },
    { sender: 'bot', text: 'What is your proficiency level for these skills?' },
    { sender: 'bot', text: 'What achievements do you have?' },
    { sender: 'bot', text: 'Who issued these achievements?' },
    { sender: 'bot', text: 'When did you receive these achievements?' },
    { sender: 'bot', text: 'Can you describe these achievements?' },
    // ...add more questions here...
]

const ChatBuilder: React.FC = () => {
    const [state, setState] = React.useState<ChatBuilderState>({
        messages: [questions[0]],
        currentInput: '',
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, currentInput: event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const userMessage: Message = {
            sender: 'user',
            text: state.currentInput,
        }
        let newMessages: Message[] = [...state.messages, userMessage]
        const nextQuestion = questions[state.messages.length]
        if (nextQuestion) {
            newMessages.push(nextQuestion)
        }
        setState({
            messages: newMessages,
            currentInput: '',
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    maxHeight: 400,
                    overflowY: 'scroll',
                    marginBottom: 2,
                }}
            >
                {state.messages.map((message, index) => (
                    <Typography key={index} variant="body1">
                        <strong>{message.sender}:</strong> {message.text}
                    </Typography>
                ))}
            </Box>
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    width: '80%',
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    value={state.currentInput}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <Button variant="contained" type="submit">
                    Send
                </Button>
            </Box>
        </Box>
    )
}

export default ChatBuilder
