import React, {useState} from 'react';
import './MovieFilter.style.css'
import {Button, Dropdown} from "react-bootstrap";
import {useMovieGenreQuery} from "../../../hooks/useMovieGenre";

const MovieFilter = ({movie, setMovieList, movieList}) => {

    const {data: genres} = useMovieGenreQuery()

    const [ genreFilter, setGenreFilter ] = useState('');

    const selectGenre = (e) => {

        setGenreFilter(e.target.value);

        let tmps = [];


        // let filteredProducts = [];
        // {tmps?.map((index, tmp) => (
        //      tmps.filter((tmp) =>
        //          // console.log(tmp)
        //          tmp === filters ? filteredProducts = tmp.toLowerCase().includes(filters.toLowerCase()) : false
        //     )
        //
        // ))}
    }
    return (
        <div className="filter-container">
            <div className="movie-genre-container">
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Genre
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {genres?.map((genre, index) => (
                            <Button variant="outline-secondary" value={genre.id} key={index}
                                    // className={filters === genre ? "genre-btn active" : "genre-btn"}
                                    onClick={(e)=> {selectGenre(e); }}>{genre.name}</Button>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default MovieFilter;