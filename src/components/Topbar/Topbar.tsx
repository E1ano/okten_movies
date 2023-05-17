import React from 'react';
import classes from './Topbar.module.scss';
import {useForm} from "react-hook-form";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

interface IData {
    movieSearch: string
}
const Topbar = () => {
    const {reset, register, handleSubmit} = useForm<IData>();
    const navigate = useNavigate();
    const searchMovie = (data:IData) => {
        navigate(`/movies?query=${data.movieSearch.trim()}&page=1`);
        reset();
    }

    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit(searchMovie)}>
                <SearchIcon sx={{fontSize: 28}} style={{ fill: 'rgb(90, 106, 146)'}}/>
                <input
                    type="text"
                    min="2"
                    max="20"
                    placeholder="Search for movies"
                    autoComplete="off"
                    required {...register("movieSearch")}
                />
            </form>

        </div>
    );
};

export default Topbar;