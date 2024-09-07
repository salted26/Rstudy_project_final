import React, {useState} from 'react';
import './MovieSort.style.css'
import {Button, Dropdown} from "react-bootstrap";

const MyComponent = ({movie, setMovie}) => {
    const sortName = ["ASC", "DESC"];
    const [sort, setSort] = useState("ASC");

    console.log(movie)

    const selectSort = (e) => {

        if (sort !== e.target.value) {
            setSort(e.target.value);
            switch (sort) {
                case "ASC" : {
                    setMovie([...movie].sort((a, b) => {
                        return a.popularity - b.popularity
                    }));
                    break;
                }
                case "DESC" : {
                    setMovie([...movie].sort((a, b) => {
                        return b.popularity - a.popularity
                    }));
                    break;
                }
                default :
                    setMovie([...movie]);
                    break;
            }
            return movie;
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
                                onClick={(e)=> selectSort(e)}>{name}</Button>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default MyComponent;
