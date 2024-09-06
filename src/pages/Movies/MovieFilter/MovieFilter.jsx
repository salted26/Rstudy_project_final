import React, {useState} from 'react';
import './MovieFilter.style.css'
import {Button, Dropdown} from "react-bootstrap";
import {useMovieGenreQuery} from "../../../hooks/useMovieGenre";

const MovieFilter = ({movie, setMovieList, movieList}) => {

    const {data: genres} = useMovieGenreQuery()
    const [sort, setSort] = useState("ASC");
    const sortName = ["ASC", "DESC"];
    const [movieData, setMovieData] = useState([])
    const [filter, setFilter] = useState('');
    const [ test, setTest ] = useState([]);

    const selectSort = (e) => {
        setMovieData(movie.results);
        if (sort !== e.target.value) {
            setSort(e.target.value);
            switch (sort) {
                case "ASC" : {
                    setMovieList([...movieData].sort((a, b) => {
                        return a.popularity - b.popularity
                    }));
                    break;
                }
                case "DESC" : {
                    setMovieList([...movieData].sort((a, b) => {
                        return b.popularity - a.popularity
                    }));
                    break;
                }
                default :
                    setMovieData([...movieData]);
                    break;
            }
            return movieList;
        } else {
            alert("이미 정렬되어 있습니다.");
        }
    }

    const selectGenre = (e) => {
        setMovieData(movie.results);

        console.log(filter)

        let tmps = [];

        {movieData.map((item, index) => (
            tmps.push(item.genre_ids)
        ))}

        let filteredProducts = [];
        {tmps?.map((index, tmp) => (
             tmps.filter((tmp) =>
                 // console.log(tmp)
                 tmp === filter ? filteredProducts = tmp.toLowerCase().includes(filter.toLowerCase()) : false
            )

        ))}
        console.log(filteredProducts)

        // setMovieList(filteredProducts);
    }
    return (
        <div className="filter-container">
            <div className="movie-popular-container">
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {sortName?.map((name, index) => (
                            <Button className={sort === name ? "sort-btn active" : "sort-btn"} variant="outline-secondary" value={name} key={index}
                                    onClick={(e)=> selectSort(e)}>{name}</Button>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="movie-genre-container">
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Genre
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {genres?.map((genre, index) => (
                            <Button variant="outline-secondary" value={genre.id} key={index} className={sort === genre ? "genre-btn active" : "genre-btn"}
                                    onClick={(e)=> {selectGenre(e); setFilter(e.target.value)}}>{genre.name}</Button>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default MovieFilter;