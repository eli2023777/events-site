import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { GeneralContext } from '../App';
import { DualIcon } from '../helpers/DualIcon';
import React, { useEffect, useState, useContext } from 'react';
import { METHOD } from '../hooks/useAPI';
import useAPI from '../hooks/useAPI';
import '../css/footer.css';


const Footer = () => {

    // Footer Method
    const UI_ICONS_FOOTER_STATE = {
        HOME: 'HOME',
        LIKE: 'LIKE',
        ABOUT: 'ABOUT'
    }

    // Footer icons states
    const [uiFooterState, setUIFooterState] = useState(localStorage.getItem('uiFooterState'));
    const [homeIconFooter, setHomeIconFooter] = useState(UI_ICONS_FOOTER_STATE.HOME ? true : false);
    const [likeIconFooter, setLikeIconFooter] = useState(UI_ICONS_FOOTER_STATE.LIKE ? true : false);
    const [aboutIconFooter, setAboutIconFooter] = useState(UI_ICONS_FOOTER_STATE.ABOUT ? true : false);

    const { isDark, token } = useContext(GeneralContext);


    // Footer toggel states value
    const footerToggel = (uiFooterState) => {
        switch (uiFooterState) {
            case uiFooterState = UI_ICONS_FOOTER_STATE.HOME:
                setHomeIconFooter(true);
                setLikeIconFooter(false);
                setAboutIconFooter(false);
                break;
            case uiFooterState = UI_ICONS_FOOTER_STATE.LIKE:
                setHomeIconFooter(false);
                setLikeIconFooter(true);
                setAboutIconFooter(false);
                break;

            case uiFooterState = UI_ICONS_FOOTER_STATE.ABOUT:
                setHomeIconFooter(false);
                setLikeIconFooter(false);
                setAboutIconFooter(true);
                break;
        }
    };

    useEffect(() => {
        localStorage.setItem('uiFooterState', uiFooterState);
    }, [uiFooterState]);

    useEffect(() => {
        footerToggel(uiFooterState);
    }, []);


    return (
        <div>


            <Nav
                className={`footer ${isDark ? "bg-dark" : "bg-light"}`}
                fill variant="tabs"
            >
                {/* Home */}
                <Nav.Item >
                    <Nav.Link href="/" onClick={() =>
                        setUIFooterState(UI_ICONS_FOOTER_STATE.HOME)
                    } >
                        {homeIconFooter ?
                            (<svg xmlns="http://www.w3.org/2000/svg" width={'20px'} viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                                fill={isDark ? '#fff' : ''} /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width={'23px'} viewBox="0 0 24 24">
                                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" fill={isDark ? '#fff' : ''}></path>
                                </svg>
                            )}
                    </Nav.Link>
                </Nav.Item>

                {/* Fav Cards */}
                {token &&
                    <Nav.Item>
                        <Nav.Link href='/favourites'
                            onClick={() => {
                                setUIFooterState(UI_ICONS_FOOTER_STATE.LIKE);
                            }} >
                            <svg xmlns="http://www.w3.org/2000/svg" width={'20px'} viewBox="0 0 512 512"><path d={likeIconFooter ? "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" : "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"}
                                fill={isDark ? '#fff' : ''}
                            /></svg>
                        </Nav.Link>
                    </Nav.Item>
                }

                {/* About */}
                <Nav.Item >
                    <Nav.Link href='/about'
                        onClick={() =>
                            setUIFooterState(UI_ICONS_FOOTER_STATE.ABOUT)
                        }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="0 0 50 50">
                            <path d={aboutIconFooter ? "M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z" : "M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 25 11 A 3 3 0 0 0 25 17 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 23 23 L 23 36 L 21 36 L 21 38 L 29 38 L 29 36 L 27 36 L 27 21 L 21 21 z"} fill={isDark ? '#fff' : ''}></path>
                        </svg>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Footer
