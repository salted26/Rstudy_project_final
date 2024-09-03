import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"

const fetchUpCommingMovies = () => {
    return api.get('/movie/upcoming?language=ko-KR')
}

export const useUpCommingMovieQuery = () => {
    return useQuery({
        queryKey : ['movie-upComming'],
        queryFn : fetchUpCommingMovies,
        select: (data) =>{
            return data.data
        }
    })
}