import React from 'react';
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import './PopularMovieSlide.style.css'

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

const PopularMovieSlide = () => {

    const { data, isLoading, isError, error } = usePopularMoviesQuery()

    console.log("data results", data)

    if(isLoading){
        return (
            <div>
                <h5>Loading.... </h5>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <Alert varian="danger">{error.message}</Alert>
            </div>
        )
    }
    return (
        <div>
            PopularMovieSlide
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
            </Carousel>;
        </div>
    );
};

export default PopularMovieSlide;