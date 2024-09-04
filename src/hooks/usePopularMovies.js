import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"

const fetchPopularMovies = () => {
    return api.get('/movie/popular?language=ko')
}

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey : ['movie-popular'],
        queryFn : fetchPopularMovies,
        select: (data) =>{
            return data.data
        }
    })
}