import './MovieCard.style.css'
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";
import {Badge} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";

const MovieCard = ({movie}) => {

    const {data:genreData} = useMovieGenreQuery();
    const navigate = useNavigate();

    const image = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
    const url = "url(" + image + ")";

    const showGenre = (genreIdList) => {
        if(!genreData) return [];
        const genreNameList = genreIdList?.map(id => {
            const genreObj = genreData.find((genre)=> genre.id === id);
            return genreObj.name;
        })
        return genreNameList;
    }

    const handleMovie = () => {
        navigate(`/movies/${movie.id}`);
    }

    const movieTitle = () => {
        if(movie?.original_language === 'en') {
            return (
                <>
                    <h3>{movie.original_title}</h3>
                    <h5>{movie.title}</h5>
                </>
            )
        } else {
            return (
                <h3>{movie.title}</h3>
            )
        }

    }

    return (
        <div className="movie-card" style={{backgroundImage: url, backgroundSize:'cover', width:'100%'}} onClick={handleMovie}>
            <div className="overlay">
                <div className="title">
                    {movieTitle()}
                </div>
                <div className="average">{movie?.vote_average}</div>
                <div className="count">{movie?.vote_count}</div>
                <div className="genres">
                    {showGenre(movie?.genre_ids).map((genre, index) => (
                        <Badge bg="danger" key={index}>{genre}</Badge>
                    ))}
                </div>
                <div className="popular">
                    <img src="https://cdn-icons-png.flaticon.com/512/7130/7130962.png" style={{width: 30}} alt="popular-icon"/>
                    {movie?.popularity}
                </div>
                <div className="adult">{movie?.adult === true ? <img
                        src="https://i.namu.wiki/i/vfVYas0SafuPqO2KatZMeqy8VFvWz--BuH04pV9W4vXQjOcUb7lN0om_G9VDlS8_OGdbZM1xYmeLpjAhbZd9Uw.svg"
                        alt="adult"/>
                    : <img
                        src="https://i.namu.wiki/i/Uts-mBKobjds3ZRCx9h1tNaoyoP8uVjtXUyFkLLutFIin-Nwrc2ecvIiGfmGR5B7yOdtLiSdxzzhvrL4jH8RvTzTwRkbfg2UGmPbafP3uZfogttlMyu9ql2SQSh_achDHLGmauNcafF69GMBMJQarQ.svg"
                        alt="All"/>}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
