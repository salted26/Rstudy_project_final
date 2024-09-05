import React, {useState} from 'react';
import './MovieFilter.style.css'
import {Button, Dropdown, Form} from "react-bootstrap";
import {useMovieGenreQuery} from "../../../hooks/useMovieGenre";
import {useNavigate} from "react-router-dom";

const MovieFilter = ({movie, setMovieList}) => {

    const navigate = useNavigate();
    const {data:genre} = useMovieGenreQuery()
    const sortName = ["ASC","DESC"];
    const [ movieData, setMovieData ] = useState([])

    const selectSort = (e) => {
        setMovieData(movie.results);
        if(e.target.value="ASC") {
            setMovieList([...movieData].sort((a,b) => {return a.popularity - b.popularity}))
        }
        if(e.target.value="DESC") {
            setMovieList([...movieData].sort((a,b) => {return b.popularity - a.popularity}))
        }
    }

    const selectGenre = (e) => {
        e.preventDefault();
        let genreId = e.target.value;
        navigate(`/movies?q=${genreId}`);
    }

    return (
        <div className="filter-container">
            <div className="movie-popular-container">
                <Form.Select onChange={(e)=>selectSort(e)}>
                    {sortName.map((name, index)=>(
                        <option value={name} key={index}>{name}</option>
                    ))}
                </Form.Select>
            </div>
            <div className="movie-genre-container">
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Genre
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {genre?.map((genre, index) => (
                            <Button variant="outline-secondary" value={genre.id} key={index} onClick={(e)=>selectGenre(e)}>{genre.name}</Button>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default MovieFilter;