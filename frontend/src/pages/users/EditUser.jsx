import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import FullUser from '../../models/FullUser';
import { jwtDecode } from "jwt-decode";


const EditUser = () => {

    const [user, setUser] = useState({});
    const url = 'http://localhost:7000';

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userID = decodedToken._id;

    // -- For Get One --
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${url}/users/${userID}`,
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
            // setIsLoading(false);
        }
    };

    // Get One
    useEffect(() => {
        fetchUser();
    }, []);


    // -- For Edit --
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("User data being sent:", user);


        try {
            const res = await axios.put(`${url}/users/${userID}`, user,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );
            setUser(user);
            console.log("User updated successfully:", res.data);

        } catch (err) {
            console.error("Error updating user:", err);
        };

    };


    return (
        <div>
            <h1>Edit Prophile</h1>
            <br /><br />

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3 grid-item" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name='first' placeholder={user.name?.first} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['firstName']}</div> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last" placeholder={user.name?.last} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['lastName']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder={user?.phone} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['phone']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="url" placeholder={user.image?.url} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['url']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image ALT</Form.Label>
                    <Form.Control type="text" name="alt" placeholder={user.image?.alt} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['alt']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" placeholder={user.address?.state} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['state']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="country" placeholder={user.address?.country} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['country']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" placeholder={user.address?.city} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['city']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" name="street" placeholder={user.address?.street} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['street']}</div> */}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control type="number" name="houseNumber" placeholder={user.address?.houseNumber} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['houseNumber']}</div> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="number" name="zip" placeholder={user.address?.zip} onChange={handleChange} />
                    {/* <div style={{ color: 'red' }}>{errors && errors['zip']}</div> */}
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>

            </Form>
            <br />
            {/* <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div> */}

            <br />
            <br />
            <br />
        </div >
    )
}

export default EditUser;

