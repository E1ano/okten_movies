import {IRes} from "../types/axiosRes.type";
import {axiosService} from "./axios.service";
import {urls} from "../constans";
import {IFullData, IFullGenres, IMovie, IVideo} from "../interfaces";

const movieService = {
    getAll: (page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.movie}?page=${page}`),
    getGenres: ():IRes<IFullGenres> => axiosService.get(urls.categories),
    getMovieByName: (movieName:string, page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.search}?query=${movieName}&page=${page}`),
    getVideos: (movieId:number):IRes<IVideo> => axiosService.get(`${urls.videos}/${movieId}/videos`),
}

export default movieService;