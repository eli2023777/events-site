import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './register.css';
import FullUser from '../../models/FullUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../App';


const Register = () => {
    const [user, setUser] = useState(new FullUser());
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const [message, setMesssage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({}); // errors is a JS object, with the key = field name, and value = error message
    const { API, setLoading } = useContext(GeneralContext);
    const [isBusiness, setIsBusiness] = useState(false);


    const handelChange = (e) => {
        const currUser = new FullUser(user.first, user.last, user.phone, user.email, user.password, user.url, user.alt,
            user.state, user.country, user.city, user.street, user.houseNumber, user.zip);
        currUser.updateField(e.target.name, e.target.value);
        setUser(currUser);
    };


    // const handelChange = (e) => {
    //     setUser(prevUser => {
    //         const updatedUser = { ...prevUser, [e.target.name]: e.target.value };
    //         return updatedUser;
    //     });
    // };

    const handelSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setMesssage('');

        const lclErrors = user.validate();

        // 1. Check if form is valid?
        if (Object.keys(lclErrors).length === 0) {
            // Delete errors

            // 2. Success
            setMesssage('You have registered successfully!');
            setIsSuccess(true);

            // Send to server
            onSignUp();

        } else {
            // 3. Fail
            setMesssage('Invalid form values. Please try again.');
            setIsSuccess(false);
            setErrors(lclErrors)
        }
    };


    const onSignUp = async () => {
        try {
            await axios.post(`${API}/users`, {
                name: {
                    first: user.first,
                    last: user.last,
                },
                phone: user.phone,
                email: user.email,
                password: user.password,
                isBusiness: isBusiness,

                image: {
                    url: user.url,
                    alt: user.alt,
                },
                address: {
                    state: user.state,
                    country: user.country,
                    city: user.city,
                    street: user.street,
                    houseNumber: user.houseNumber,
                    zip: user.zip,
                },
            });
            setIsSignUp(true);
            setMesssage('You have registered successfully!');
        } catch (error) {
            console.error(error);
            setMesssage('An error occurred. Please try again.');
        }
    }

    useEffect(() => {
        if (errors)
            setErrors(errors);
    }, [errors]);

    useEffect(() => {
        if (isSignUp) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSignUp]);


    return (
        <div>
            <h1>Register</h1>
            <br /><br />

            <Form onSubmit={handelSubmit}>


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
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handelChange} />
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

                <div>
                    <Button variant="primary" type="submit" style={{ height: '50%', marginBottom: '2px' }}>
                        Submit
                    </Button>

                    <Button variant="primary" type="reset" style={{ height: '50%', marginBottom: '2px' }}>
                        Reset
                        {/* --- ADD HERE Reset icon --- */}
                    </Button>
                </div>

            </Form>
            <br />
            <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div>

            <br />
            <br />
            <br />
        </div >
    )
}

export default Register
