import React, {useState} from 'react';
import './MoviePage.style.css'
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import {useSearchMovieQuery} from "../../hooks/useSearchMovie";
import {useSearchParams} from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import MoviePagination from "../../common/MoviePagination/MoviePagination";
import MovieSort from "./MovieSort/MovieSort";
import MovieFilter from "./MovieFilter/MovieFilter";

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
    const keyword = query.get("q")
    const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page});
    const [ movieList, setMovieList ] = useState();

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

    console.log("movieList", movieList)

    return (
        <>
            { data?.results.length > 0 ?
            <Container className="movie-page-container" >
                <Row>
                        { movieList === undefined ?
                            <>
                                <Col lg={10}>
                                    <Row className="movie-card-container">
                                        {data?.results.map((item, index)=> (
                                            <Col lg={3} key={index}>
                                                <MovieCard movie={item} />
                                            </Col>
                                        ))}
                                    </Row>
                                    {data.results.length > 4 ?
                                        <div className="pagination-container">
                                            <MoviePagination data={data} setPage={setPage} page={page}/>
                                        </div>
                                        :
                                        <></>
                                    }
                                </Col>
                                <Col lg={2}>
                                    <MovieSort movie={data} setMovieList={setMovieList} movieList={movieList}/>
                                    <MovieFilter movie={data} setMovieList={setMovieList} movieList={movieList}/>
                                </Col>
                            </>
                            :
                            <>
                                <Col lg={10}>
                                    <Row className="movie-card-container">
                                        {movieList?.results.map((item, index)=> (
                                            <Col lg={3} key={index}>
                                                <MovieCard movie={item} />
                                            </Col>
                                        ))}
                                    </Row>
                                    {movieList?.results.length > 4 ?
                                        <div className="pagination-container">
                                            <MoviePagination data={movieList} setPage={setPage} page={page}/>
                                        </div>
                                        :
                                        <></>
                                    }
                                </Col>
                                <Col lg={2}>
                                    <MovieSort movie={data} setMovieList={setMovieList} movieList={movieList}/>
                                    <MovieFilter movie={data} setMovieList={setMovieList} movieList={movieList}/>
                                </Col>
                            </>
                        }

                </Row>
            </Container>
            :
            <Container style={{ display: (data?.results.length > 0) ? "none" : "block" }}>
                <Row>
                    <Col lg={10}>
                        <div>검색결과가 없습니다.</div>
                    </Col>
                    <Col lg={2}>
                        <></>
                    </Col>
                </Row>
            </Container>
        }
        </>
    );
};

export default MoviePage;
