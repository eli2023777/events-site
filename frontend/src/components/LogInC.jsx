import React, { useState, useEffect, useContext } from 'react'
import User from '../models/User';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/loginC.css';
import { GeneralContext } from '../App';
import useAPI from '../hooks/useAPI';
import { METHOD } from '../hooks/useAPI';


const LogInC = () => {
    const [user, setUser] = useState(new User());
    const [errors, setErrors] = useState(null);
    const [APIError, setAPIError] = useState(false);
    const [message, setMesssage] = useState('');
    const navigate = useNavigate();
    const { setLoginC, token, setToken } = useContext(GeneralContext);
    const [error, callAPI, payload, data] = useAPI();
    const [isSuccess, setIsSuccess] = useState();


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
            callAPI(METHOD.LOG_IN, 'login', user);
        else {
            setIsSuccess(false);
            setMesssage('Email or password is incorrect.Please try again.')
        }
    };


    const saveToken = () => {
        const expDate = Date.now() + 60 * 60 * 1000; // One Hour
        localStorage.setItem("expDate", expDate);
    };

    useEffect(() => {
        const expDate = localStorage.getItem("expDate");
        console.log(expDate);

        // !expDate || 
        if (Date.now() > +expDate) {
            setToken(null);
            setLoginC(true); // Show login modal
        }
    }, []);


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



    useEffect(() => {
        if (data) {

            localStorage.setItem('token', data);
            setToken(localStorage.getItem('token'));

            saveToken();
            setIsSuccess(true)
            setMesssage('You have logged in successfully!');
            setLoginC(false);


        }
    }, [data]);



    return (

        <div>
            <div className='loginCFrame' onClick={() => setLoginC(false)}>
                <div className="loginC" onClick={(e) => {
                    e.stopPropagation(); setLoginC(true);
                }}>

                    <div className="logInCText">

                        <h6>For your privacy, you have logged out.</h6>

                        <h4>Please log in again</h4>

                        <h6>Not registered yet? <a
                            href="/register" onClick={() => setLoginC(false)}
                        >Register here!
                        </a></h6>

                    </div>


                    <Form id="logInForm" onSubmit={handleSubmit}>
                        <Form.Floating className="floating-input mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder=" "
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Email</label>
                            <div style={{ color: 'red' }}>{errors && errors['email']}</div>
                        </Form.Floating>

                        <Form.Floating className="floating-input mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder=" "
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <div style={{ color: 'red' }}>{errors && errors['password']}</div>
                        </Form.Floating>
                    </Form>

                    <div className="logInCButtons">
                        <Button variant="success" form='logInForm' type="submit" >
                            Submit
                        </Button>

                        <Button variant="none" form='logInForm' type="reset" >
                            <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
                        </Button>
                    </div>

                    {APIError &&
                        <div style={{ color: 'red' }}>Email or password is incorrect. Please try again.</div>
                    }

                    <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div>


                </div>
            </div>
        </div >

        // <>
        //     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //         <div class="modal-dialog" role="document">
        //             <div class="modal-content">
        //                 <div class="modal-header">
        //                     <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        //                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                         <span aria-hidden="true">&times;</span>
        //                     </button>
        //                 </div>
        //                 <div class="modal-body">
        //                     <form>
        //                         <div class="form-group">
        //                             <label for="recipient-name" class="col-form-label">Recipient:</label>
        //                             <input type="text" class="form-control" id="recipient-name" />
        //                         </div>
        //                         <div class="form-group">
        //                             <label for="message-text" class="col-form-label">Message:</label>
        //                             <textarea class="form-control" id="message-text"></textarea>
        //                         </div>
        //                     </form>
        //                 </div>
        //                 <div class="modal-footer">
        //                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                     <button type="button" class="btn btn-primary">Send message</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

export default LogInC
