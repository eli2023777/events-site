import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import '../css/navbarC.css';
import { GeneralContext } from '../App';
import { METHOD } from '../hooks/useAPI';
import useAPI from '../hooks/useAPI';
import { DualIcon } from '../helpers/DualIcon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faUser,
    faUserTie,
    faKey
} from '@fortawesome/free-solid-svg-icons';

library.add(faCalendarAlt, faUser, faUserTie, faKey);


const NavbarC = () => {


    const navigate = useNavigate();
    const [inputSearch, setInputSearch] = useState('');
    const [searchValue, setSearchValue] = useState(''); // for search value
    const [results, setResults] = useState([]);
    const { setLoading, token, setToken, isDark, setIsDark } = useContext(GeneralContext);
    const [user, setUser] = useState({});
    const [error, callAPI, payload, data] = useAPI();

    const [routes, setRoutes] = useState('users');


    const isInitialUserCheck = () => {
        if (user.email === 'business@10.com' || 'admin@10.com' || 'regular @10.com')
            return true;
        else
            return false;
    }

    const [isInitialUser] = useState(isInitialUserCheck);



    // For Search bar
    const handleChange = (value) => {
        setInputSearch(value);
        fetchSearchData(value);
    };


    // For Search bar
    const fetchSearchData = async () => {
        setRoutes('events');

        callAPI(METHOD.GET_ALL, routes);

    };


    // Fetch user for log-in mode
    const fetchUser = () => {
        if (token) {
            setLoading(true);
            setRoutes('users');
            const decodedToken = token ? jwtDecode(token) : null;
            const userID = decodedToken._id;

            callAPI(METHOD.GET_ONE, routes, userID);
        }
    };




    useEffect(() => {
        if (token)
            fetchUser();
    }, [])

    useEffect(() => {
        if (token)
            fetchUser();
    }, [token])


    useEffect(() => {
        if (routes === 'events' && Array.isArray(data)) { // 1. GET ALL case - for search results
            const filteredResults = data.filter(event =>
                event?.title?.toLowerCase().includes(searchValue.toLowerCase())
                // event?.title?.toLowerCase() === searchValue.toLowerCase()
            );
            setResults(filteredResults);

            navigate('/results', { state: { results: filteredResults } });
        }


    }, [data, routes, searchValue]);

    useEffect(() => {
        if (data && routes === 'users')  // 2. GET ONE case - fetch user.
            setUser(data);
    }, [data])




    // Change the body's background style dynamically
    useEffect(() => {
        if (isDark) {
            document.body.style.backgroundImage = `url("/images/night-background.jpg")`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
        } else {
            document.body.style.backgroundImage = `url("/images/day-background.jpg")`;
        }
        localStorage.setItem('isDark', isDark)

    }, [isDark]);





    return (
        <div>


            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 header"
                    style={{ backgroundColor: isDark ? "#390135" : "#f6f4ef" }} variant={isDark ? "dark" : 'light'}
                >
                    <Container fluid className="d-flex justify-content-between align-items-center">

                        {/* Logo */}
                        <Navbar.Brand href="/events-site" className="me-2">
                            <FontAwesomeIcon icon={faCalendarAlt} size="2x"
                                className={isDark ? "me-2 text-success" : "me-2 text-warning"} />
                        </Navbar.Brand>

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

                                {/* Search bar */}
                                <Form className="flex-grow-1 mx-4 search">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                </Form>

                                <Nav className="d-flex justify-content-end align-items-centerr">

                                    {token &&
                                        <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
                                    }

                                    {/*  User Management - Only for Admin */}
                                    {token &&
                                        user.isAdmin &&

                                        <Nav.Link as={Link} to="/user-management">User Management</Nav.Link>
                                    }

                                    {/*  My Events - Only for Business */}
                                    {token &&
                                        user.isBusiness &&

                                        <Nav.Link as={Link} to="/my-events">My Events</Nav.Link>
                                    }


                                </Nav>



                                <Nav className="mx-auto d-flex align-items-center">
                                    <Button variant={isDark ? 'light' : ''}
                                        className='darkIcon'
                                        onClick={() =>
                                            setIsDark(isDark ? false : true)} >

                                        {isDark ?
                                            <DualIcon iconName="sun" />
                                            :
                                            <DualIcon iconName="moon" />
                                        }

                                    </Button>
                                </Nav>



                                {/* Register and Log-in */}
                                {!token && (
                                    <>
                                        <Nav className="mx-auto d-flex align-items-center">
                                            <Nav.Item>
                                                <Nav.Link as={Link} to="/register">
                                                    Register
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link as={Link} to="/logIn">
                                                    Log In
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </>
                                )}

                                {/* Log out */}
                                <Nav className="justify-content-end flex-grow-1 pe-3">

                                    {token && (
                                        <Button variant={isDark ? 'light' : ''}
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                setToken(null);
                                            }
                                            }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={'22px'} viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                        </Button>
                                    )}

                                    {token &&
                                        <Nav className="mx-auto d-flex align-items-center">
                                            <span className="navbar-text">
                                                Welcome back <br /> {user.name?.first} {user.name?.last}
                                            </span>
                                        </Nav>
                                    }

                                    {token &&
                                        (
                                            isInitialUser ? (

                                                <Nav className="mx-auto d-flex align-items-center">
                                                    {/* Check if there is a image url, */}
                                                    {/* if not - put default image by role */}
                                                    {user.image?.url ? (
                                                        <img
                                                            className="profileImg"
                                                            src={user?.image?.url}
                                                            alt={user?.image?.alt}
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={user.isAdmin ? faKey : user.isBusiness ? faUserTie : faUser}
                                                            size="3x"
                                                            className="profileIcon"
                                                        />
                                                    )}


                                                </Nav>

                                            ) : (

                                                < NavDropdown title={
                                                    // Check if there is a image url,
                                                    // if not - put default image by role
                                                    user.image?.url ? (
                                                        <img
                                                            className="profileImg"
                                                            src={user.image.url}
                                                            alt={user.image.alt}
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={user.isAdmin ? faKey : user.isBusiness ? faUserTie : faUser}
                                                            size="3x"
                                                            className="profileIcon"
                                                        />
                                                    )


                                                }
                                                    id="navbarScrollingDropdown"
                                                    // Addinng a class for CSS to delete the arrow icon
                                                    className="no-arrow-dropdown mx-auto d-flex align-items-center"
                                                    align="end"
                                                >

                                                    {/* unavailable for initial users */}
                                                    {/* {isInitialUser === false && ( */}
                                                    <>
                                                        <NavDropdown.Item as={Link} to="/edit-user">
                                                            Edit prophile
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                        <NavDropdown.Item
                                                            as={Link} to={user.image?.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            View image prophile
                                                        </NavDropdown.Item>
                                                    </>


                                                </NavDropdown>
                                            ))}
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))
            }

        </div >
    )
}

export default NavbarC
