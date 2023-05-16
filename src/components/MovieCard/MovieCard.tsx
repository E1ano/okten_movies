import React, {FC} from 'react';
import classes from './MovieCard.module.scss';
import {Rating} from "@mui/material";
import {IMovie} from "../../interfaces/movie.interface";
import {useAppSelector} from "../../hooks/redux.hooks";

interface IProps {
    movie: IMovie
}
const MovieCard:FC<IProps> = ({movie}) => {
    const {genres} = useAppSelector(state => state.movieReducer);
    const {poster_path, genre_ids, title, overview, vote_average, release_date} = movie;
    const descr = overview.slice(0, 100) + '...';
    const poster = "https://image.tmdb.org/t/p/w500/" + poster_path;
    const date = new Date(release_date);
    const rate = Math.round(vote_average * 2) / 2;
    const genreNumber = genre_ids[0];
    let genreObj;
    genreObj = genres ? genres.find(item => item.id === genreNumber) : null;

    return (
        <div className={classes.wrapper}>
            <div className={classes.poster}><img src={poster} alt={title}/></div>
            <div className={classes.infoWrapper}>
                <div className={classes.title}>{title}</div>
                <div className={classes.addInfo}>{date.getFullYear()} | {genreObj?.name}</div>
                <div className={classes.description}>{descr}</div>
            </div>
            <Rating
                className={classes.rate}
                name="half-rating-read"
                defaultValue={rate}
                precision={0.5}
                max={10}
                readOnly
            />
        </div>
    );
};

export default MovieCard;