import * as React from 'react'
import { TextField, Button, Box, Typography, Card } from '@mui/material'
import { styled, keyframes } from '@mui/system'

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
}

interface ChatBuilderState {
    messages: Message[]
    currentInput: string
}

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
        messages: [],
        currentInput: '',
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, currentInput: event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const userMessage: Message = {
            role: 'user',
            content: state.currentInput,
        }
        let newMessages: Message[] = [...state.messages, userMessage]

        // Make a POST request to the OpenAI API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
            },
            body: JSON.stringify({
                messages: newMessages,
                model: 'gpt-3.5-turbo',
            }),
        })

        // Parse the response
        const data = await response.json()

        // Check if data.choices exists and has at least one element
        // Check if data.message exists
        if (data.message) {
            // Add the assistant's response to the messages
            newMessages.push({
                role: 'assistant',
                content: data.message.trim(),
            })
        } else {
            // Handle the error
            console.error('No choices in response')
            newMessages.push({
                role: 'assistant',
                content: 'Sorry, I could not generate a response.',
            })
        }

        // Update the state with the new messages
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
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    marginassistanttom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}
            >
                {state.messages.map((message, index) =>
                    message.role === 'user' ? (
                        <UserMessageCard key={index}>
                            <Typography variant="body1">
                                <strong>{message.role}:</strong>{' '}
                                {message.content}
                            </Typography>
                        </UserMessageCard>
                    ) : (
                        <BotMessageCard key={index}>
                            <Typography variant="body1">
                                <strong>{message.role}:</strong>{' '}
                                {message.content}
                            </Typography>
                        </BotMessageCard>
                    )
                )}
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
