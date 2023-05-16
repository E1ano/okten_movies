import React, {useEffect} from 'react';
import classes from './MoviesPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {movieActions} from "../../redux/slices/movie.slice";
import MovieCard from "../../components/MovieCard/MovieCard";
import {createTheme, ThemeProvider, Pagination, PaginationItem} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(231, 62, 65)"
        }
    },
});

const MoviesPage = () => {
    const {movies, total_pages, currentPage, searchMovies} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = +(searchParams.get('page') || '1');
    const query = searchParams.get('query');

    useEffect(() => {
        dispatch(movieActions.updatePage(page));
        dispatch(movieActions.getAll(page));
        dispatch(movieActions.getGenres());

        if (query) {
            dispatch(movieActions.getMovieByName([query, page]));
        }

    }, [currentPage, query]);

    const handlePagination = (event:any, page:number) => {
        dispatch(movieActions.updatePage(page))
    }

    return (
        <>
            <div className={classes.cardWrapper}>
                {
                    (searchMovies.length > 1 ? searchMovies : movies).map(item => <MovieCard key={item.id} movie={item}/>)
                }
            </div>
            {<ThemeProvider theme={theme}>
                <Pagination
                    className={classes.pagination}
                    count={total_pages}
                    color="primary"
                    page={page}
                    size={"large"}
                    onChange={handlePagination}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={query ? `?query=${query}&page=${item.page}` : `?page=${item.page}`}
                            {...item}
                        />
                    )}
                />
            </ThemeProvider>}

        </>
    );
};

export default MoviesPage;