import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"

const fetchSearchByKeyword = ({keyword, page}) => {
    return keyword ?
        api.get(`/search/movie?query=${keyword}`)
        : api.get(`/movie/popular?page=${page}`)
}

export const useSearchMovieQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey : ['movie-search', keyword, page],
        queryFn : ()=>fetchSearchByKeyword({keyword, page}),
        select: (data) =>{
            return data.data
        }
    })
}