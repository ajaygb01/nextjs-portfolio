import * as React from 'react'
import {
    TextField,
    Button,
    Box,
    Typography,
    Card,
    Avatar,
    Grid,
} from '@mui/material'
import { styled, keyframes } from '@mui/system'
import ReactMarkdown from 'react-markdown'

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
}

interface ChatBuilderState {
    messages: Message[]
    currentInput: string
    isLoading: boolean
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

const SystemMessageCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#D3D3D3', // Light gray background
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    alignSelf: 'center',
    animation: `${popIn} 0.2s ease`,
}))

interface ChatBuilderProps {
    username?: string | null
}

const ChatBuilder: React.FC<ChatBuilderProps> = ({ username }) => {
    const [state, setState] = React.useState<ChatBuilderState>({
        messages: [],
        currentInput: '',
        isLoading: false,
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, currentInput: event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const userMessage: Message = {
            role: 'user',
            content: state.currentInput,
        }
        const loadingMessage: Message = {
            role: 'system',
            content: 'Loading...',
        }
        setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, userMessage, loadingMessage],
            isLoading: true,
            currentInput: '',
        }))
    }

    React.useEffect(() => {
        const makeApiCall = async () => {
            // Make a POST request to the OpenAI API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
                },
                body: JSON.stringify({
                    messages: state.messages,
                    model: 'gpt-3.5-turbo',
                }),
            })

            // Parse the response
            const data = await response.json()

            // Check if data.message exists
            if (data.message) {
                // Remove the loading message and add the assistant's response to the messages
                const newMessages = state.messages.slice(0, -1)
                newMessages.push({
                    role: 'assistant',
                    content: data.message.trim(),
                })
                setState((prevState) => ({
                    ...prevState,
                    messages: newMessages,
                    isLoading: false,
                }))
            } else {
                // Handle the error
                console.error('No choices in response')
                const newMessages = state.messages.slice(0, -1)
                newMessages.push({
                    role: 'assistant',
                    content: 'Sorry, I could not generate a response.',
                })
                setState((prevState) => ({
                    ...prevState,
                    messages: newMessages,
                    isLoading: false,
                }))
            }
        }

        if (state.isLoading) {
            makeApiCall()
        }
    }, [state.isLoading])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto', // take up the full height of the viewport
                backgroundColor: 'grey',
                pb: 8,
            }}
        >
            <Box
                sx={{
                    width: 'auto',
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    overflow: 'auto',
                }}
            >
                {state.messages.map((message, index) =>
                    message.role === 'user' ? (
                        <UserMessageCard
                            key={index}
                            sx={{
                                borderRadius: '10px 0px 10px 10px',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Box>{message.content}</Box>
                                <Avatar sx={{ ml: 1 }}>
                                    {username?.charAt(0)}
                                </Avatar>
                            </Typography>
                        </UserMessageCard>
                    ) : message.role === 'assistant' ? (
                        <BotMessageCard
                            key={index}
                            sx={{ borderRadius: '0px 10px 10px 10px' }}
                        >
                            <Grid container>
                                <Grid item sx={{ mr: 3 }}>
                                    <Avatar>AS</Avatar>
                                </Grid>
                                <Grid item xs sx={{ mt: 1 }}>
                                    <Typography variant="body1">
                                        <ReactMarkdown>
                                            {message.content}
                                        </ReactMarkdown>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </BotMessageCard>
                    ) : (
                        <SystemMessageCard key={index}>
                            <Typography variant="body1">
                                <strong>{message.role}:</strong>{' '}
                                {message.content}
                            </Typography>
                        </SystemMessageCard>
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
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    padding: 1,
                    backgroundColor: 'white',
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    value={state.currentInput}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={state.isLoading}
                >
                    Send
                </Button>
            </Box>
        </Box>
    )
}

export default ChatBuilder
