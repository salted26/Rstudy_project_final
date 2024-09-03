import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"

const fetchMovieDeatil = ({id}) => {
    return api.get(`/movie/${id}?language=ko-KR`)
}

export const useMovieDetailQuery = (id) => {
    return useQuery({
        queryKey: ['movie-detaile', id],
        queryFn: () => fetchMovieDeatil({id}),
        select: (data) => {
            return data.data
        },
        retry: 1,
    })
}
