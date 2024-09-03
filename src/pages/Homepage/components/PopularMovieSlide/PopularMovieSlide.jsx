import React from 'react';
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import '../../../../common/MovieSlider/MovieSlider.style.css'
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constants/responsive";

const PopularMovieSlide = () => {

    const { data, isLoading, isError, error } = usePopularMoviesQuery()
    if(isLoading){
        return (<div> <h5>Loading.... </h5></div> )
    }
    if (isError) {
        return (<div> <Alert varian="danger">{error.message}</Alert> </div>)
    }
    return (
        <div>
            <MovieSlider movies={data} title={"Popular Movies"} responsive={responsive}/>
        </div>
    );
};

export default PopularMovieSlide;