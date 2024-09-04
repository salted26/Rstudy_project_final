import React from 'react';
import './MovieDetail.style.css'
import {useParams} from "react-router-dom";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieDetailPage from "./components/MovieDetailPage/MovieDetailPage";
import MovieRecommendations from "./components/MovieRecommendations/MovieRecommendations";

const MovieDetail = () => {

    let { id} = useParams();

    return (
        <div className="movieDetail-container">
            <MovieDetailPage id={id} />
            <MovieReviews id={id} />
            <MovieRecommendations id={id} />
        </div>
    );
};

export default MovieDetail;