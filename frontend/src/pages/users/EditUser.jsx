import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FullUser from '../../models/FullUser';
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import { METHOD } from '../../hooks/useAPI';

const EditUser = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userID = decodedToken?._id;
    const isDark = localStorage.getItem('isDark');
    const [isUpdated, setIsUpdated] = useState(false);
    const [message, setMesssage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // errors is a JS object, with the key = field name, and value = error message
    const [errors, setErrors] = useState({});

    const [error, callAPI, payload, data] = useAPI();



    // --- Get One - Fetch User ---
    useEffect(() => {
        if (token) {
            // 'location.state.id' = From User Managment page(from Admin),
            // OR 'userID' from Regular user.
            callAPI(METHOD.GET_ONE, 'users', location.state ? location.state.user._id : userID);
        }
    }, []);


    useEffect(() => {
        if (data)
            setUser(data);
    }, [data]);



    // --- For Edit ---
    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser((prevUser) => {
            if (name.includes('.')) {
                const [parentKey, childKey] = name.split('.');
                return {
                    ...prevUser,
                    [parentKey]: {
                        ...prevUser[parentKey],
                        [childKey]: value,
                    },
                };
            }

            return {
                ...prevUser,
                [name]: value,
            };
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setMesssage('');

        const userObj = new FullUser(user);
        const isEditUser = true;
        const lclErrors = userObj.validate(isEditUser);

        // 1. Check if form is valid?
        if (Object.keys(lclErrors).length === 0) {

            // 2. Send to server
            updateUser();
        } else {
            // 3. Fail
            setMesssage('Invalid form values. Please try again.');
            setIsSuccess(false);
            setErrors(lclErrors)

        }

    };

    const updateUser = async () => {

        try {
            callAPI(METHOD.UPDATE, 'users', location.state ? location.state : user);

            if (data) {
                setMesssage('Uesr updated successfully!');
                setIsSuccess(true);
                setIsUpdated(true);
            }



        } catch (err) {
            console.error("Error updating user:", err);
            setMesssage('An error occurred. Please try again.');
        };
    };


    const handleDeleteUser = (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete your account? 
            All your data will be gone.`)) {
            if (!location.state) {
                callAPI(METHOD.DELETE, 'users', user);
            }
        } else {
            return;
        };
    };


    useEffect(() => {
        if (errors)
            setErrors(errors);
        if (isUpdated) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors, isUpdated]);


    return (
        <div>
            <div className={isDark ? 'darkFrame' : 'lightFrame'}>

                <h1>Edit Prophile</h1>
                <br /><br />

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name='name.first' placeholder={user.name?.first} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['first']}</div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="name.last" placeholder={user.name?.last} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['last']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" placeholder={user?.phone} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['phone']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder={user?.email} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['email']}</div>

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="image.url" placeholder={user.image?.url} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['url']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Image ALT</Form.Label>
                        <Form.Control type="text" name="image.alt" placeholder={user.image?.alt} onChange={handleChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" name="address.state" placeholder={user.address?.state} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['state']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="address.country" placeholder={user.address?.country} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['country']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="address.city" placeholder={user.address?.city} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['city']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" name="address.street" placeholder={user.address?.street} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['street']}</div>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control type="number" name="address.houseNumber" placeholder={user.address?.houseNumber} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="number" name="address.zip" placeholder={user.address?.zip} onChange={handleChange} />
                        <div style={{ color: 'red' }}>{errors && errors['zip']}</div>
                    </Form.Group>

                    <Button variant="success" type="submit" >
                        Submit
                    </Button>

                    <Button variant="none" type="reset" >
                        <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
                    </Button>
                    <br />
                    <br />

                    {
                        !location.state &&

                        <Button variant="danger" type="text" onClick={handleDeleteUser} >
                            Delete account
                        </Button>
                    }


                </Form>
                <br />
                <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div>
                <br />
                <br />
                <br />
            </div>
        </div >
    )
};

export default EditUser;


