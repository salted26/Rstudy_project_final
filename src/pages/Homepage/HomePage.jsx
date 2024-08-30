import React from 'react';
import './Homepage.style.css'
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";

// 1. 배너
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const HomePage = () => {
    return (
        <div>
            <Banner />
            <PopularMovieSlide />
            <TopRatedMovieSlide />
        </div>
    );
};

export default HomePage;