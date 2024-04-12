import * as React from 'react'
import { TextField, Button, Box, Typography, Card } from '@mui/material'
import { styled, keyframes } from '@mui/system'

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

const popIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

const UserMessageCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#90EE90', // Light green background
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    alignSelf: 'flex-end',
    animation: `${popIn} 0.2s ease`,
}))

const BotMessageCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#ADD8E6', // Light blue background
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    alignSelf: 'flex-start',
    animation: `${popIn} 0.2s ease`,
}))

const ChatBuilder: React.FC = () => {
    const [state, setState] = React.useState<ChatBuilderState>({
        messages: [questions[0]],
        currentInput: '',
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, currentInput: event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
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

        // Make a POST request to the /api/chat endpoint
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: newMessages }),
        })

        // Parse the response
        const data = await response.json()

        // Add the bot's response to the messages
        newMessages.push({
            sender: 'bot',
            text: data.message,
        })

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
                justifyContent: 'space-between',
                height: '90vh',
                alignItems: 'center',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}
            >
                {state.messages.map((message, index) => {
                    if (message) {
                        return message.sender === 'user' ? (
                            <UserMessageCard key={index}>
                                <Typography variant="body1">
                                    <strong>{message.sender}:</strong>{' '}
                                    {message.text}
                                </Typography>
                            </UserMessageCard>
                        ) : (
                            <BotMessageCard key={index}>
                                <Typography variant="body1">
                                    <strong>{message.sender}:</strong>{' '}
                                    {message.text}
                                </Typography>
                            </BotMessageCard>
                        )
                    }
                })}
            </Box>
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    width: '80%',
                    position: 'fixed',
                    bottom: 0,
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
