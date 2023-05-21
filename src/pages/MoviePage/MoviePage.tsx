import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import movieService from "../../services/movie.service";
import {IMovie, IVideo} from "../../interfaces";
import classes from "./MoviePage.module.scss";
import {useAppSelector} from "../../hooks/redux.hooks";
import {Rating, Skeleton} from "@mui/material";
import {urls, notFound} from "../../constans";
import {useAppLocation} from "../../hooks/router.hook";
import Container from "../../UI/Container/Container";
import Carousel from "../../components/Carousel/Carousel";

const MoviePage = () => {
    const [trailerKey, setTrailerKey] = useState<string | undefined>('');
    const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);
    const {genres} = useAppSelector(state => state.movieReducer);
    console.log(similarMovies)

    const {state} = useAppLocation<IMovie>();
    const navigate = useNavigate();
    const {id, poster_path, genre_ids, title, overview, vote_average, release_date} = state;

    const date = release_date ? new Date(release_date).getFullYear() : notFound.year;
    const description = overview ? overview : notFound.description;
    const rate = Math.round(vote_average * 2) / 2;
    const poster = poster_path ? (urls.poster + poster_path) : notFound.image;
    let genreArr = [], genreNamesArr = [];
    genreArr = genres?.filter(item => genre_ids?.includes(item.id));
    genreNamesArr = genreArr.map(item => item.name);

    useEffect(() => {
        movieService.getSimilar(id)
            .then((data) => data.data)
            .then((data) => setSimilarMovies(data.results))
            .catch((error) => console.error(error));
        movieService.getVideos(id)
            .then((data) => data.data)
            .then((data) => handleTrailerKey(data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleTrailerKey = (data:IVideo) => {
        const result = data.results.find(item => item.type === "Trailer" || item.name === "Official Trailer")?.key;
        setTrailerKey(result);
    }

    const moveToGenre = (genreName:string) => {
        const genreObj = genres.find(genreObj => genreObj.name === genreName);
        const genreId = genreObj ? genreObj.id : null;
        navigate(`/movies?with_genres=${genreId}`);
    }

    return (
        <Container>
            <div className={classes.movieWrapper}>
                <div className={classes.poster}><img src={poster} alt={title}/></div>
                <div className={classes.infoBlock}>
                    <div className={classes.title}>{title}</div>
                    <Rating
                        className={classes.rate}
                        name="half-rating-read"
                        defaultValue={rate}
                        precision={0.5}
                        max={10}
                        readOnly
                    />
                    <div className={classes.additionalInfo}>
                        <span>{date} </span>
                        {
                            genreNamesArr.map((item, index) => (
                                <span
                                    onClick={() => moveToGenre(item.toString())}
                                    key={index}
                                    className={classes.genreName}
                                >
                                {item.toString()}
                            </span>
                            ))
                        }
                    </div>
                    <div className={classes.description}>{description}</div>
                    {trailerKey ?
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                        :
                        <Skeleton
                            animation="wave"
                            className={classes.skeleton}
                            sx={{bgcolor: "rgb(90, 106, 146)"}}
                        />
                    }
                </div>
            </div>

            <div className={classes.carouselTitle}>Similar:</div>
            <Carousel movies={similarMovies}/>
        </Container>
    );
};

export default MoviePage;