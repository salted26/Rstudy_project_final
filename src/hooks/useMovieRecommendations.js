import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"


const fetchMovieRecommendation = ({id}) => {
    return api.get(`/movie/${id}/recommendations`)
}

export const useMovieRecommendations = ({id}) => {
    return useQuery({
        queryKey: ['movie-recommendations', id],
        queryFn: () => fetchMovieRecommendation({id}),
        select: (data) => {
            return data.data
        },
    })
}
