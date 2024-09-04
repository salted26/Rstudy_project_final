import React from 'react';
import './Banner.style.css'
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";

const Banner = () => {

    const {data, isLoading, isError, error} = usePopularMoviesQuery();

    const image = `https://image.tmdb.org/t/p/w1280${data?.results[0].poster_path}`;
    const url = "url(" + image + ")";

    const overview = (overview) => {
        console.log(overview.length)
        let content = overview.length;
        if(content > 150) {
            content = overview.substring(0, 150) + "...";
        } else {
            content = overview;
        }
        return content;
    }

    if(isLoading){
        return (<div> <h5>Loading.... </h5></div> )
    }
    if (isError) {
        return (<div> <Alert varian="danger">{error.message}</Alert> </div>)
    }
    return (
        <div className="banner-container" style={{backgroundImage:url}} >
            <div className="title-container">
                <h1>{data?.results[0].original_title}</h1>
                <p>
                    {overview(data?.results[0].overview)}
                </p>
            </div>
        </div>
    );
};


export default Banner;