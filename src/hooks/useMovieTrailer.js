import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"


const fetchMovieTrailer = ({id}) => {
    return api.get(`/movie/${id}/videos?language=ko`)
}

export const useMovieTrailerQuery = (id) => {
    return useQuery({
        queryKey: ['movie-trailer', id],
        queryFn: () => fetchMovieTrailer({id}),
        select: (data) => {
            return data.data.results
        },
        retry: 3,
    })
}
