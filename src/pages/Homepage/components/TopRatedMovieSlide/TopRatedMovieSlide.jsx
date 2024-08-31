import React from 'react';
import {useTopRatedMoviesQuery} from "../../../../hooks/useTopRatedMovies";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import {Alert} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import './TopRatedMovieSlide.style.css'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

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
            TopRatedMovie
            <Carousel
                infinite={true}
                centerMode={true}
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            >
                {data.results.map((movie, index)=> (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default TopRatedMovieSlide;