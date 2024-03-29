import React, {useEffect} from 'react';
import classes from './HomePage.module.scss'
import Carousel from "../../components/Carousel/Carousel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {movieActions} from "../../redux/slices/movie.slice";
import Container from "../../UI/Container/Container";
const HomePage = () => {
    const {upcomingMovies, nowPlayingMovies, popularMovies} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getUpcoming(1));
        dispatch(movieActions.getNowPlaying(1));
        dispatch(movieActions.getPopular(1));
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>Okten Movies - Discover your own taste</h1>
            <div className={classes.arrowContainer}>
                <div className={classes.chevron}></div>
                <div className={classes.chevron}></div>
                <div className={classes.chevron}></div>
            </div>
            <div className={classes.carouselWrapper}>
                <Container>
                    <div className={classes.carouselTitle}>Upcoming:</div>
                    <Carousel movies={upcomingMovies}/>
                </Container>
                <Container>
                    <div className={classes.carouselTitle}>Now playing:</div>
                    <Carousel movies={nowPlayingMovies}/>
                </Container>
                <Container>
                    <div className={classes.carouselTitle}>Popular:</div>
                    <Carousel movies={popularMovies}/>
                </Container>
            </div>
        </div>
    );
};

export default HomePage;