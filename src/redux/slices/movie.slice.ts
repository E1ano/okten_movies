import {IMovie} from "../../interfaces/movie.interface";
import {IGenre} from "../../interfaces/genre.interface";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from 'axios';
import movieService from "../../services/movie.service";
import {IFullData} from "../../interfaces/fullData.interface";
import {IFullGenres} from "../../interfaces/fullGenres.interface";

interface IState {
    movies: IMovie[],
    currentPage: number,
    total_pages: number,
    genres: IGenre[],
    searchMovies: IMovie[],
}

const initialState: IState = {
    movies: [],
    currentPage: 1,
    total_pages: 500,
    genres: [],
    searchMovies: [],
}

const getAll = createAsyncThunk<IFullData<IMovie[]>, number> (
    "movieSlice/getAll",
    async (page,{rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
});

const getGenres = createAsyncThunk<IFullGenres, void> (
    "movieSlice/getGenres",
        async (_, {rejectWithValue}) => {
            try {
                const {data} = await movieService.getGenres();
                return data;
            } catch (e) {
                const err = e as AxiosError;
                return rejectWithValue(err.response?.data);
            }
        }
)

const getMovieByName = createAsyncThunk<IFullData<IMovie[]>, [string, number]> (
    "movieSlice/getMovieByName",
    async ([movieName, page], {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieByName(movieName, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        updatePage: (state, action) => {
            state.currentPage = action.payload;
        },
        clearSearchMovie: (state) => {
            state.searchMovies = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload.genres;
            })
            .addCase(getMovieByName.fulfilled, (state, action) => {
                state.searchMovies = action.payload.results;
                state.total_pages = action.payload.total_pages;
            })
    }
})

const {actions, reducer: movieReducer} = movieSlice;
const movieActions = {
    ...actions,
    getAll,
    getGenres,
    getMovieByName
}
export {
    movieActions,
    movieReducer
}