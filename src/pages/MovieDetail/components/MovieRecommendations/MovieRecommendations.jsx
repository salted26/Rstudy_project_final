import React from 'react';
import './MovieRecommendations.style.css'
import {useMovieRecommendations} from "../../../../hooks/useMovieRecommendations";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constants/responsive";
import {Alert} from "react-bootstrap";

const MovieRecommendations = ({id}) => {

    const { data, isLoading, isError, error } = useMovieRecommendations({id});

    console.log(data);

    if(isLoading){
        return (<div> <h5>Loading.... </h5></div> )
    }
    if (isError) {
        return (<div> <Alert varian="danger">{error.message}</Alert> </div>)
    }
    return (
        <div className="movie-recommendations-container">
            {data !== undefined
                ? <MovieSlider title={"Recommendation Movies"} movies={data} responsive={responsive}/>
                : <>recommandatios not available</>
            }
        </div>
    );
};

export default MovieRecommendations;