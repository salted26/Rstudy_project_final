import React from 'react';
import './MovieReviews.style.css'
import {useMovieReviewsQuery} from "../../../../hooks/useMovieReviews";
import {Accordion, Alert, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";

const MovieReviews = () => {

    const {id} = useParams();

    const { data:reviews, isLoading, isError, error } = useMovieReviewsQuery({id})

    const created_dt =(date)=> {
        const option ={
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        let create_dt = new Date(date).toLocaleDateString('ko-KR', option);
        return create_dt;
    }

    const getContent = (content) => {
        let review = content.length;
        if(review > 150) {
            review = content.substring(0, 50) + "...";
        } else {
            review = '';
        }
        return review;
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
        <div className="movie-review-container">
            {reviews === undefined ?
            <Accordion>
                {reviews?.map((review, index) => (
                <Accordion.Item eventKey={index}>
                    <Accordion.Header className="review-title">
                        <div className="review-overview"> {getContent(review?.content)} </div>
                        <div className="review-info"> {review?.author_details.name} </div>
                    </Accordion.Header>
                    <Accordion.Body className="review-body" event>
                        <div className="review-top">
                            <div className="author">{review?.author}&nbsp;({review?.author_details.username})</div>
                            <div>{created_dt(review?.created_at)}</div>
                        </div>
                        <div className="review">{review?.content}</div>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion> :
                <></>
            }
        </div>
    );
};

export default MovieReviews;