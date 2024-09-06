import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import MovieCard from "../../../common/MovieCard/MovieCard";
import MoviePagination from "../../../common/MoviePagination/MoviePagination";
import MovieFilter from "../MovieFilter/MovieFilter";

const MovieListPage = ({data, setPage, page}) => {

    const [ movieList, setMovieList] = useState([]);

    console.log(movieList, movieList.length);

    if(movieList.length === 0){
    return (
        <div>
            <Row>
                <Col lg={10}>
                    <Row className="movie-card-container">
                        {data?.results.map((item, index)=> (
                            <Col lg={3} key={index}>
                                <MovieCard movie={item} />
                            </Col>
                        ))}
                    </Row>
                    {data?.results.length > 4 ?
                        <div className="pagination-container">
                            <MoviePagination data={data} setPage={setPage} page={page}/>
                        </div>
                        :
                        <></>
                    }
                </Col>
                <Col lg={2}>
                    <MovieFilter movie={data} setMovieList={setMovieList} />
                </Col>
            </Row>
        </div>
    );
    } else if (movieList.length > 0) {
        return(
            <div>
                <Row>
                    <Col lg={10}>
                        <Row className="movie-card-container">
                            {movieList?.map((item, index) => (
                                <Col lg={3} key={index}>
                                    <MovieCard movie={item}/>
                                </Col>
                            ))}
                        </Row>
                        {movieList?.length > 4 ?
                            <div className="pagination-container">
                                <MoviePagination data={data} setPage={setPage} page={page}/>
                            </div>
                            :
                            <></>
                        }
                    </Col>
                    <Col lg={2}>
                        <MovieFilter movie={movieList} setMovieList={setMovieList} movieList={movieList}/>
                    </Col>
                </Row>
            </div>
        )
    }
};

export default MovieListPage;