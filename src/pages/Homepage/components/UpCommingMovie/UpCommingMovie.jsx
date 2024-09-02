import React from 'react';
import {Alert} from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import '../../../../common/MovieSlider/MovieSlider.style.css'
import {useUpCommingMovieQuery} from "../../../../hooks/useUpCommingMovie";
import {responsive} from "../../../../constants/responsive";

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
            <MovieSlider movies={data} title={"UpComming Movies"} responsive={responsive}/>
        </div>
    );
};

export default UpCommingMovie;