import React from 'react';
import './MovieDetail.style.css'
import {useMovieDetailQuery} from "../../hooks/useMovieDetail";
import {Alert, Badge, Col, Container, Row, Spinner} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";

const MovieDetail = () => {

    let { id} = useParams();
    const {data:genreData} = useMovieGenreQuery();
    const { data:movie, isLoading, isError, error } = useMovieDetailQuery(id);

    const image = (path) => {
        let url = `https://image.tmdb.org/t/p/w1280`+path;
        return url;
    }

    console.log(movie);

    const showGenre = (genreIdList) => {
        if(!genreData) return [];
        const genreNameList = genreIdList?.map(id => {
            let genreId = id.id;
            const genreObj = genreData.find((genreData)=> genreData.id === genreId);
            return genreObj.name;
        })
        return genreNameList;
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

    if(isLoading){
        return (
            <div className="spinner-area">
                <Spinner color="whtie"
                         animation="border"
                         variant="danger"
                         style={{width:'5rem', height:'5rem'}}/>
            </div>
        )
    }
    if (isError) {
        return (<div> <Alert varian="danger">{error.message}</Alert> </div>)
    }
    return (
        <div>
            <Container className="movie-detail-container">
                <Row className="detail-infomation">
                    <Col lg={6} xs={12} className="first-info">
                        <img src={image(movie?.poster_path)} alt="" className="poster-img"/>
                    </Col>
                    <Col lg={6} xs={12} className="second-info">
                        <Row className="detail-infomation-title">
                            <div className="movie-title">
                                {movieTitle()}
                                {movie?.adult === true ?
                                    <img
                                        src="https://i.namu.wiki/i/vfVYas0SafuPqO2KatZMeqy8VFvWz--BuH04pV9W4vXQjOcUb7lN0om_G9VDlS8_OGdbZM1xYmeLpjAhbZd9Uw.svg"
                                        alt="adult"/>
                                    : <img
                                        src="https://i.namu.wiki/i/Uts-mBKobjds3ZRCx9h1tNaoyoP8uVjtXUyFkLLutFIin-Nwrc2ecvIiGfmGR5B7yOdtLiSdxzzhvrL4jH8RvTzTwRkbfg2UGmPbafP3uZfogttlMyu9ql2SQSh_achDHLGmauNcafF69GMBMJQarQ.svg"
                                        alt="All"/>}
                            </div>
                        </Row>
                        <div className="movie-release"><b>RELREASE&nbsp; :&nbsp; </b>{movie?.release_date}</div>
                        <div className="movie-run"><b>RUN&nbsp;TIME&nbsp;:&nbsp;</b>{movie?.runtime}</div>
                        <div className="movie-genres">
                            {showGenre(movie?.genres).map((genre, index) => (
                                <h4 key={index}><Badge bg="danger">{genre}</Badge></h4>
                            ))}
                        </div>
                        <div className="movie-tag">{movie?.tagline}</div>
                        <div className="movie-overview">
                            <p><b>OVERVIEW</b></p>
                            {movie?.overview}
                        </div>
                        <div className="movie-vote">
                            <div>
                                <h3><Badge pill bg="success" size="sm">Average</Badge></h3>
                                <b>{movie?.vote_average}</b>
                            </div>
                            <div>
                                <h3><Badge pill bg="success" size="sm">Count</Badge></h3>
                                <b>{movie?.vote_count}</b>
                            </div>
                            <div>
                                <h3><Badge pill bg="success" size="sm">Popularity</Badge></h3>
                                <b>{movie?.popularity}</b>
                            </div>
                        </div>
                        <div className="movie-revenue">
                            <p><b>BUDGET</b>&nbsp; :&nbsp; {movie?.budget.toLocaleString('ko-KR')}</p>
                            <p><b>REVENUE</b>&nbsp; :&nbsp; {movie?.revenue.toLocaleString('ko-KR')} </p>
                        </div>
                        <div className="movie-homepage"><Link to={movie?.homepage} className="none-link">
                            <h5>{movie?.homepage}</h5></Link></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MovieDetail;