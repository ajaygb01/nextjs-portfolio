import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'

interface Movie {
    title: string
    poster_path: string
}

const MbHome: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        fetch(
            'https://api.themoviedb.org/3/movie/now_playing?api_key=22b0398570904ff6fab740fe93e15a7f'
        )
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results)
            })
    }, [])

    return (
        <div>
            {movies.map((movie, index) => (
                <Card key={index} sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {movie.title}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default MbHome
