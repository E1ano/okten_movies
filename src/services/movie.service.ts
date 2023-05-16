import {IRes} from "../types/axiosRes.type";
import {axiosService} from "./axios.service";
import {urls} from "../constans/urls";
import {IFullData} from "../interfaces/fullData.interface";
import {IFullGenres} from "../interfaces/fullGenres.interface";
import {IMovie} from "../interfaces/movie.interface";


const movieService = {
    getAll: (page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.movie}?page=${page}`),
    getGenres: ():IRes<IFullGenres> => axiosService.get(urls.categories),
    getMovieByName: (movieName:string, page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.search}?query=${movieName}&page=${page}`)
}

export default movieService;