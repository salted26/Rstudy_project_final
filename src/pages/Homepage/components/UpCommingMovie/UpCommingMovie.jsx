import React from 'react';
import {Alert} from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import './UpCommingMovie.style.css'
import {useUpCommingMovieQuery} from "../../../../hooks/useUpCommingMovie";

const UpCommingMovie = () => {

    const { data, isLoading, isError, error } = useUpCommingMovieQuery()

    if(isLoading){
        return (<div> <h5>Loading.... </h5></div> )
    }
    if (isError) {
        return (<div> <Alert varian="danger">{error.message}</Alert> </div>)
    }

    return (
        <div>
            <MovieSlider movies={data} title={"UpComming Movies"} />
        </div>
    );
};

export default UpCommingMovie;