import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from './Sidebar.module.scss';
import Avatar from '@mui/material/Avatar';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {movieActions} from "../../redux/slices/movie.slice";
const Sidebar = () => {
    const {currentPage, searchMovies} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const renderMovies = () => {
        if (searchMovies.length > 1) {
            dispatch(movieActions.clearSearchMovie());
            navigate(`/movies?page=1`);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.topWrapper}>
                <MovieIcon sx={{fontSize: 42}} style={{ fill: 'rgb(231, 62, 65)'}}/>

                <nav>
                    <ul className={classes.menu}>
                        <li><Link to="/"><WindowSharpIcon sx={{fontSize: 24}} style={{ fill: 'rgb(90, 106, 146)'}}/></Link></li>
                        <li onClick={renderMovies}>
                            <Link to={`/movies?page=${currentPage}`}>
                                <LocalMoviesIcon sx={{fontSize: 24}} style={{ fill: 'rgb(90, 106, 146)'}}/>
                            </Link>
                        </li>
                        <li><Link to="/categories"><CategoryIcon sx={{fontSize: 24}} style={{ fill: 'rgb(90, 106, 146)'}}/></Link></li>
                    </ul>
                </nav>
            </div>

            <div className={classes.user}>
                <Avatar
                    alt="User"
                    sx={{ width: 42, height: 42 }}
                    src="https://avatars.githubusercontent.com/u/74934174?v=4"
                />
            </div>
        </div>
    );
};

export default Sidebar;