import './MovieCard.style.css'
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";
import {Badge} from "react-bootstrap";
import React, {useEffect} from "react";
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

    useEffect(() => {
    }, []);

    const movieTitle = () => {
        if(movie?.original_language === 'en' && movie?.original_title !== movie?.title) {
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
                <div className="overlay-content">
                    <div className="movie-card-title">
                        {movieTitle()}
                    </div>
                    <div className="average">{movie?.vote_average}</div>
                    <div className="count">{movie?.vote_count}</div>
                    <div className="movie-card-genre">
                        {showGenre(movie?.genre_ids).map((genre, index) => (
                            <Badge bg="danger" key={index}>{genre}</Badge>
                        ))}
                    </div>
                    <div className="popular">
                        <img src="https://cdn-icons-png.flaticon.com/512/7130/7130962.png" style={{width: 30}} alt="popular-icon"/>
                        {movie?.popularity}
                    </div>
                    <div className="adult">{movie?.adult === true ?
                        <img
                            src="https://i.namu.wiki/i/-zM9W5kqsBckPS-54BDoR88YbHp8G3x7opJuRSYbotfPCkJtYQQJK24aGitSSh5NQUnKOgWlCgzoNWd2f_1ggg.svg"
                            alt="adult"/>
                        : <img
                            src="https://i.namu.wiki/i/ARC33KSWCSNHeVZIpCG0teQsv-oaJ8XqU0DX4vEHmJJR1Rdtt3Bo_wCB9v2l0KGLb3aKG8WfRRWwCGqSGq1T_chno_ZjomXXPuIyi9MkcMFPALtDY88Ng1XssRVqqCGntgzNn2c-_rNglnHegastDg.svg"
                            alt="All"/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
