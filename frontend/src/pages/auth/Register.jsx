import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './register.css';
import FullUser from '../../models/FullUser';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../App';
import useAPI from '../../hooks/useAPI';
import { METHOD } from '../../hooks/useAPI';



const Register = () => {
    const [user, setUser] = useState(new FullUser());
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const [message, setMesssage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({}); // errors is a JS object, with the key = field name, and value = error message
    const { setLoading } = useContext(GeneralContext);
    const [isBusiness, setIsBusiness] = useState(false);
    const isDark = localStorage.getItem('isDark');

    const [error, callAPI, payload, data] = useAPI();


    const handelChange = (e) => {
        const currUser = new FullUser(user.first, user.last, user.phone, user.email,
            user.password, user.url, user.alt, user.state, user.country, user.city, user.street,
            user.houseNumber, user.zip);
        currUser.updateField(e.target.name, e.target.value);
        setUser(currUser);

    };


    const handelSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setMesssage('');

        const lclErrors = user.validate();

        // 1. Check if form is valid?
        if (Object.keys(lclErrors).length === 0) {
            // 2. Send to server
            callAPI(METHOD.CREATE, 'users', user, isBusiness, true);


        } else {
            // 3. Fail
            setMesssage('Invalid form values. Please try again.');
            setIsSuccess(false);
            setErrors(lclErrors)
        }
    };


    useEffect(() => {
        if (errors)
            setErrors(errors);
        if (isSignUp) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors, isSignUp]);


    useEffect(() => {
        if (data && Object.keys(data).length > 0) {

            setMesssage('You have registered successfully!');
            setIsSuccess(true);
            setIsSignUp(true);
        }
    }, [data]);



    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <h1>Register</h1>
                <br /><br />

                <Form onSubmit={handelSubmit}>

                    <div class="grid">
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Business Account"
                                checked={isBusiness}
                                onChange={(e) => setIsBusiness(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="name" name='first' placeholder="First Name" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['first']}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last" placeholder="Last Name" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['last']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Phone" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['phone']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Email" onChange={handelChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password"
                                onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['password']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="url" placeholder="url" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['url']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image ALT</Form.Label>
                            <Form.Control type="text" name="alt" placeholder="alt" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['alt']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" placeholder="State" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['state']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name="country" placeholder="Country" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['country']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" placeholder="City" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['city']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" name="street" placeholder="Street" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['street']}</div>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>House Number</Form.Label>
                            <Form.Control type="number" name="houseNumber" placeholder="House Number" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="number" name="zip" placeholder="Zip Code" onChange={handelChange} />
                            <div style={{ color: 'red' }}>{errors && errors['zip']}</div>
                        </Form.Group>
                    </div>

                    <div>
                        <Button variant="success" form='logInForm' type="submit"  >
                            Submit
                        </Button>


                        <Button variant="none" type="reset" >
                            <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
                        </Button>
                    </div>

                </Form>
                <br />
                <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div>

                <br />
                <br />
                <br />
            </div>
        </div >
    )
}

export default Register








// const onSignUp = async () => {
// try {
//     await axios.post(`${API}/users`, {
//         name: {
//             first: user.first,
//             last: user.last,
//         },

//         isBusiness: isBusiness,

//         phone: user.phone,
//         email: user.email,
//         password: user.password,

//         image: {
//             url: user.url,
//             alt: user.alt,
//         },


//         address: {
//             state: user.state,
//             country: user.country,
//             city: user.city,
//             street: user.street,
//             houseNumber: user.houseNumber,
//             zip: user.zip,
//         },

//     },
// {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// setLoading(true);
// setMesssage('You have registered successfully!');
// setIsSuccess(true);
// setIsSignUp(true);
// } catch (error) {
//     console.error("Error Regiser user:", error);
// }
// }