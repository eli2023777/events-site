import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import '../css/navbarC.css';
import { GeneralContext } from '../App';



const NavbarC = () => {


    const navigate = useNavigate();
    const [inputSearch, setInputSearch] = useState('');
    const [results, setResults] = useState([]);
    // const [] = useContext(localStorage.getItem('token'));
    const { API, setLoading, token, setToken } = useContext(GeneralContext);
    const [user, setUser] = useState({});


    // For Search bar
    const handleChange = (value) => {
        setInputSearch(value);
        fetchSearchData(value);
    };


    // For Search bar when using Enter key
    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.location.href = '/results';
            fetchSearchData(e.target.value);
        }
    };

    // For Search bar
    const fetchSearchData = async (value) => {
        let response;
        try {
            response = await axios.get(`${API}/events`);
        } catch (e) {
            console.log(e);
        }

        const data = response.data;

        const dataResult = data.filter((event) => {
            return (
                value &&
                event &&
                event.title?.toLowerCase().includes(value))
        });

        console.log(dataResult);
        setResults(dataResult);
        navigate('/results', { state: { results } });
    };


    // Fetch user for log-in mode
    const fetchUser = async () => {

        if (token) {
            setLoading(true);

            const decodedToken = jwtDecode(token);
            const userID = decodedToken._id;
            try {
                const res = await axios.get(`${API}/users/${userID}`,
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    }
                );
                setUser(res.data);

            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    };


    useEffect(() => {
        if (token) {
            fetchUser();
            setToken(token);
        }
    }, [token]);





    return (
        <div>

            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 header">
                    <Container fluid>
                        <Navbar.Brand href="/">Events Website</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar - expand - ${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar - expand - ${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel - expand - ${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel - expand - ${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">


                                    {/*  User Management - Only for Admin */}
                                    {token &&
                                        user.isAdmin &&
                                        // <NavDropdown title="Admin" id={`offcanvasNavbarDropdown - expand - ${expand}`}></NavDropdown>
                                        < Nav.Link href="/user-management">User Management</Nav.Link>
                                    }

                                    {/*  User Management - Only for Business */}
                                    {token &&
                                        user.isBusiness &&

                                        < Nav.Link href="/my-events">My Events</Nav.Link>
                                    }


                                    {/* <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown - expand - ${ expand }`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown> */}


                                </Nav>

                                {/* <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    /> */}

                                <Form className="d-flex search">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={(e) => handleChange(e.target.value)}
                                        onKeyDown={handleEnterSearch}
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>


                                {/* Register and Log-in */}
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {!token && (
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Link to="/register"
                                            // className={isDark ? 'darkLink' : 'link'}
                                            >Register</Link>
                                            <Link to="/logIn"
                                            // className={isDark ? 'darkLink' : 'link'}
                                            >Log In</Link>
                                        </Nav>
                                    )}
                                </Nav>

                                {/* Log out */}
                                <Nav className="justify-content-end flex-grow-1 pe-3">

                                    {token && (
                                        <Button variant="none"
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                setToken(null);
                                            }
                                            }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={'22px'} viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                        </Button>
                                    )}

                                    {token &&
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            Welcome back <br /> {user.name?.first} {user.name?.last}
                                        </Nav>
                                    }

                                    {token &&

                                        <NavDropdown title={
                                            <img className='profileImg'
                                                src={user.image?.url || ""}
                                                alt={user.image?.alt || ""}
                                            />
                                        }
                                            id="navbarScrollingDropdown"
                                            // Addinng a class for CSS to delete the arrow icon
                                            className="no-arrow-dropdown"
                                        >
                                            <NavDropdown.Item href="/edit-user">
                                                Edit prophile
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                href={user.image?.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View image prophile                                                    </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                href={user.image?.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Log Out
                                            </NavDropdown.Item>

                                        </NavDropdown>
                                    }
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

        </div>
    )
}

export default NavbarC
