import React, {useState} from 'react';
import './MovieSort.style.css'
import {Button, Dropdown} from "react-bootstrap";

const MyComponent = ({movie, setMovieList, movieList}) => {
    const sortName = ["Popularity ASC", "Popularity DESC"];
    const [sort, setSort] = useState("Popularity ASC");
    const [ sortData, setSortData] = useState();

    const selectSort = (e) => {
        setSortData(movie?.results);

        if (sort !== e.target.value && sortData?.length > 0) {
            switch (sort) {
                case "Popularity ASC" : {
                    setMovieList({
                        page : movie?.page,
                        results : [...sortData].sort((a, b) => {
                        return a.popularity - b.popularity}),
                        total_pages : movie?.total_pages,
                        total_results : movie?.total_results,
                    });
                    break;
                }
                case "Popularity DESC" : {
                    setMovieList({
                        page: movie?.page,
                        results : [...sortData].sort((a, b) => {
                        return b.popularity - a.popularity}),
                        total_pages : movie?.total_pages,
                        total_results : movie?.total_results,
                    });
                    break;
                }
                default :
                    setMovieList(movie.page, [...sortData], movie.total_pages, movie.total_results);
                    break;
            }
            return movieList;
        } else {
            alert("이미 정렬되어 있습니다.");
        }
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {sortName?.map((name, index) => (
                        <Button className={sort === name ? "sort-btn active" : "sort-btn"} variant="outline-secondary" value={name} key={index}
                                onClick={(e)=> {selectSort(e); setSort(e.target.value);}}>{name}</Button>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default MyComponent;
