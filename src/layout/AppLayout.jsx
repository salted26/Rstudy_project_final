import React, {useState} from 'react';
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import {Outlet, useNavigate} from "react-router-dom";
import './AppLayout.style.css'

const AppLayout = () => {
    const [ keyword, setKeyword ] = useState('');
    const navigate  = useNavigate()

    const searchByKeyword =(e) =>{
        e.preventDefault();
        // url을 바꿔주기
        navigate(`/movies?q=${keyword}`);
    }

    return (
        <div className="AppLayout">
            <Navbar expand="lg" className="navbar" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/" className="brand"><h1>NeTfLiX</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="movies">Movies</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e)=>setKeyword(e.target.value)}
                            />
                            <Button variant="outline-danger">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default AppLayout;
