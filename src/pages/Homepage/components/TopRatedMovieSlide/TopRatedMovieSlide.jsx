import React from 'react';
import {useTopRatedMoviesQuery} from "../../../../hooks/useTopRatedMovies";
import {Alert} from "react-bootstrap";
import '../../../../common/MovieSlider/MovieSlider.style.css'
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {

    const { data, isLoading, isError, error } = useTopRatedMoviesQuery()

    if(isLoading){
        return (<div> <h5>Loading.... </h5></div> )
    }
    if (isError) {
        return (<div> <Alert varian="danger">{error.message}</Alert> </div>)
    }

    return (
        <div>
            <MovieSlider movies={data} title={"TopRated Movies"} responsive={responsive} />
        </div>
    );
};

export default TopRatedMovieSlide;