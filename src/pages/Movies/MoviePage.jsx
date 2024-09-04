import React, {useState} from 'react';
import './MoviePage.style.css'
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import {useSearchMovieQuery} from "../../hooks/useSearchMovie";
import {useSearchParams} from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import MoviePagination from "../../common/MoviePagination/MoviePagination";

// 경로 2가지
// 1. navbar 클릭해서 진행 => popular movie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지 네이션 클릭할 때 마다 page 바꿔주기
// pgage 값이 바뀔때마다 useSearchMovie에 페이지까지 넣어서 fetch
const MoviePage = () => {

    const [ query ] = useSearchParams();
    const [ page, setPage] = useState(1);
    const [ setMovieData] = useState(null);

    const keyword = query.get("q")
    const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page});

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
        <Container className="movie-page-container">
            <Row>
                <Col lg={6} xs={12}>
                    <Row>
                        {data?.results.map((item, index)=> (
                            <Col lg={6} xs={12} key={index}>
                                <MovieCard movie={item} setMovieData={setMovieData}/>
                            </Col>
                        ))}
                    </Row>
                    <MoviePagination data={data} setPage={setPage} page={page}/>
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;
