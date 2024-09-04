import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"

const fetchMovieGenre = () => {
    return api.get('/rending/movie/{time_window}') // day, week, month
}

export const useTrendingMovieQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchMovieGenre,
        select: (data) => {
            return data.data.genres
        },
    })
}