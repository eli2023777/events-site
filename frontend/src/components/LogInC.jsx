import React, { useState, useEffect, useContext } from 'react'
import User from '../models/User';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/loginC.css';
import { GeneralContext } from '../App';


const LogInC = () => {
    const [user, setUser] = useState(new User());
    const [errors, setErrors] = useState(null);
    const [APIError, setAPIError] = useState(false);
    const [message, setMesssage] = useState('');
    const navigate = useNavigate();
    const { API, setLoginC, setLoading, token, setToken } = useContext(GeneralContext);


    // const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const currUser = new User(user.email, user.password);
        currUser.updateField(e.target.name, e.target.value);
        setUser(currUser);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const currUser = new User(user.email, user.password);
        currUser.updateField(e.target.name, e.target.value);
        setUser(currUser);
        if (validateUser())
            setMesssage('You have logged in successfully!');

        onLogin();
    };


    const onLogin = async () => {
        try {
            const res =
                await axios.post(`${API}/login`, {
                    email: user.email,
                    password: user.password,
                });

            localStorage.setItem('token', res.data);
            setToken(token);

            saveToken();
            setMesssage('You have logged in successfully!');
            setLoginC(false);
        } catch (e) {
            // setAPIError(true);

            console.log(e);

        }
    };


    const saveToken = () => {
        const expDate = Date.now() + 1;
        localStorage.setItem("expDate", expDate);
    };


    const validateUser = () => {
        let formIsValid = true;
        const formErrors = {};
        const passwordRegExp = /^[a-zA-Z0-9!@#$%^&*]{7,20}$/;

        if (!user.email) {
            formIsValid = false;
            formErrors['email'] = "'Email' field must not be empty."
        }

        if (!user.password) {
            formIsValid = false;
            formErrors['password'] = "'Password' field must not be empty."
        } else if (!passwordRegExp.test(user.password)) {
            formIsValid = false;
            formErrors['password'] = "Password must contain at least 7 and max 20 characters and max 20, with upper and lower case letters, numbers and symbols."
        }

        setErrors(formErrors);
        return formIsValid;
    };


    useEffect(() => {
        if (errors)
            setErrors(errors);
    }, [errors]);

    useEffect(() => {
        if (token) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [token]);



    return (
        <div>
            <div className='loginCFrame' onClick={() => setLoginC(false)}>
                <div className="loginC" onClick={(e) => {
                    e.stopPropagation(); setLoginC(true);
                }}>


                    <h6>For your privacy, you have logged out.</h6>

                    <h4>Please log in again</h4>

                    <br />
                    <br />
                    <Form id='logInForm' onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <div style={{ color: 'red' }}>{errors && errors['email']}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <div style={{ color: 'red' }}>{errors && errors['password']}</div>
                        </Form.Group>

                    </Form>



                    <Button variant="primary" form='logInForm' type="submit" style={{ width: '100%' }} >
                        Submit
                    </Button>

                    {APIError &&
                        <div style={{ color: 'red' }}>Email or password is incorrect. Please try again.</div>
                    }

                    <div style={{ color: 'green' }}>{message}</div>


                </div>
            </div>
        </div >
    )
}

export default LogInC
