import React, {useState} from 'react';
import './MovieDetailPage.style.css'
import {Alert, Badge, Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useMovieGenreQuery} from "../../../../hooks/useMovieGenre";
import {useMovieDetailQuery} from "../../../../hooks/useMovieDetail";
import {useMovieTrailerQuery} from "../../../../hooks/useMovieTrailer";
import MovieTrailer from "./MovieTrailer/MovieTrailer";

const MovieDetailPage = ({id}) => {

    const { data:videoData } = useMovieTrailerQuery(id);
    const {data:genreData} = useMovieGenreQuery();
    const { data:movie, isLoading, isError, error } = useMovieDetailQuery(id);
    const [ lgShow, setLgShow] = useState(false);
    const [ index, setIndex ] = useState(0);

    const image = (path) => {
        let url = `https://image.tmdb.org/t/p/w1280`+path;
        return url;
    }

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
        if(movie?.original_language === 'en' && movie?.original_title !== movie?.title) {
            return (
                <>
                    <h3>{movie.original_title}</h3>
                    <h5>{movie.title}</h5>
                </>
            )
        } else { return (<h3>{movie.title}</h3>) }
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
                                        src="https://i.namu.wiki/i/-zM9W5kqsBckPS-54BDoR88YbHp8G3x7opJuRSYbotfPCkJtYQQJK24aGitSSh5NQUnKOgWlCgzoNWd2f_1ggg.svg"
                                        alt="adult"/>
                                    : <img
                                        src="https://i.namu.wiki/i/ARC33KSWCSNHeVZIpCG0teQsv-oaJ8XqU0DX4vEHmJJR1Rdtt3Bo_wCB9v2l0KGLb3aKG8WfRRWwCGqSGq1T_chno_ZjomXXPuIyi9MkcMFPALtDY88Ng1XssRVqqCGntgzNn2c-_rNglnHegastDg.svg"
                                        alt="All"/>}

                            </div>
                        </Row>
                        <div className="movie-release"><b>개봉일&nbsp; :&nbsp; </b>{movie?.release_date}</div>
                        <div className="movie-run"><b>상영시간&nbsp;:&nbsp;</b>{movie?.runtime}&nbsp;분</div>
                        <div className="movie-genres">
                            {showGenre(movie?.genres).map((genre, index) => (
                                <h4 key={index}><Badge bg="danger">{genre}</Badge></h4>
                            ))}
                        </div>
                        <div className="movie-tag">{movie?.tagline}</div>
                        {movie?.overview !== '' ?
                            <div className="movie-overview">
                                <p><b>줄거리</b></p>
                                {movie?.overview}
                            </div>
                            : <div className="movie-overview"></div>
                        }
                        <div className="movie-trailer">
                            {videoData?.map((trailer, i)=> (
                                <div className="trailer-btn-group" key={i}>
                                    <Button onClick={() => {setLgShow(true); setIndex(i)}}>
                                        <img src="https://img.freepik.com/premium-psd/play-icon-button-on-black-background_609989-2403.jpg" alt="trailer" className="trailer-img"/>
                                    </Button>
                                </div>
                            ))}
                            <MovieTrailer lgShow={lgShow} setLgShow={setLgShow} i={index} videoData={videoData} />
                        </div>
                        <div className="movie-vote">
                            <div>
                                <h3><Badge pill bg="success" size="sm">Average</Badge></h3>
                                <b>{movie?.vote_average}</b>
                            </div>
                            <div>
                                <h3><Badge pill bg="success" size="sm">Vote</Badge></h3>
                                <b>{movie?.vote_count}</b>
                            </div>
                            <div>
                                <h3><Badge pill bg="success" size="sm">Popularity</Badge></h3>
                                <b>{movie?.popularity}</b>
                            </div>
                        </div>
                        <div className="movie-revenue">
                            <div><b>제작 예산</b>&nbsp; :&nbsp; {movie?.budget.toLocaleString('ko-KR')}</div>
                            <div><b>수익</b>&nbsp; :&nbsp; {movie?.revenue.toLocaleString('ko-KR')} </div>
                        </div>
                        <div className="movie-homepage"><Link to={movie?.homepage} className="none-link">
                            <h5>{movie?.homepage}</h5></Link></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MovieDetailPage;