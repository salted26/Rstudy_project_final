import React from 'react';
import './MoviePreview.style.css'
import {useMovieDetailQuery} from "../../hooks/useMovieDetail";
import {Alert, Container, Row, Spinner} from "react-bootstrap";

const MoviePreview = ({id}) => {

    let movieId = '';
    if(id !== undefined){
        movieId = id;
    }
    const { data:movie, isLoading, isError, error } = useMovieDetailQuery(movieId);

    const image = `https://image.tmdb.org/t/p/w1280${movie?.poster_path}`;

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
            <Container className="detail-container">
                <Row className="poster-container">
                    <img src={image} alt="" className="poster-img"/>
                </Row>
                <Row className="detail-title">
                    {movie?.title}
                </Row>
            </Container>
        </div>
    );
};

export default MoviePreview;
