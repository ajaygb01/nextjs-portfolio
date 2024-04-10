import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

interface Movie {
    title: string
    poster_path: string
}

const carouselArrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const MbHome: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([])

    const apiUrl =
        'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
        process.env.NEXT_PUBLIC_MOVIE_API_KEY

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results)
            })
    }, [])

    return (
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Carousel
                showThumbs={false}
                centerMode
                centerSlidePercentage={100}
                showIndicators={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <IconButton
                            onClick={onClickHandler}
                            title={label}
                            sx={{ ...carouselArrowStyles, left: 15 }}
                        >
                            <ArrowBackIos />
                        </IconButton>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <IconButton
                            onClick={onClickHandler}
                            title={label}
                            sx={{ ...carouselArrowStyles, right: 15 }}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                    )
                }
            >
                {movies &&
                    movies.map((movie, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        bottom: '20px',
                                        color: 'white',
                                    }}
                                >
                                    {movie.title}
                                </Typography>
                            </Card>
                        </div>
                    ))}
            </Carousel>
        </Box>
    )
}

export default MbHome
