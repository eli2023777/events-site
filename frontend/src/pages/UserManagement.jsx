import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { DualIcon } from '../helpers/DualIcon';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { METHOD } from '../hooks/useAPI';
import useAPI from '../hooks/useAPI';





const UserManagement = () => {


    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const { API, setLoading } = useContext(GeneralContext);
    const navigate = useNavigate();
    const isDark = localStorage.getItem('isDark');

    const [error, callAPI, payload, data] = useAPI();


    // Fetch users 
    const fetchUsers = async () => {

        if (token) {

            callAPI(METHOD.GET_ALL, 'users');


        }
    };


    useEffect(() => {
        // Fetch users First time
        fetchUsers();
    }, []);

    useEffect(() => {
        if (data)
            setUsers(data);
    }, [data]);


    const handleAdminToggle = (id) => {

    };

    const handleBusinessToggle = (id) => {

    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm("Are you sure you want to delete?");
        if (!confirmed) {
            return; // If the user is not confirmed
        }


        try {
            await axios.delete(`${API}/users/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });

            setUsers(prevUsers => prevUsers.filter((user) => user._id !== id));

            alert('User successfully Deleted');

        } catch (error) {
            console.log('Error deleting user:', error);
            alert('Error deleting user:', error);
        }
    };



    return (
        <div>
            <header id="userManagement" className="masthead">
                <section className="d-flex align-items-center">
                    <div className="container position-relative">
                        <div className={isDark ? 'darkFrame' : 'lightFrame'}>




                            <div>
                                <div className='text-end' style={{ marginBottom: '30px' }}>

                                    {/* ADD HERE 'Add User' icon */}
                                    <button onClick={() => {
                                        navigate('/register');
                                    }
                                    }>Add User</button>

                                </div>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th
                                            // className='text-white'
                                            >Full Name</th>


                                            <th
                                            // className='text-white'

                                            // >Role</th>
                                            // <th
                                            // className='text-white'
                                            >Email</th>
                                            <th
                                            // className='text-white'
                                            // >סיסמא</th>
                                            // <th
                                            // className='text-white'
                                            >Edit</th>
                                            <th
                                            // className='text-white'
                                            >Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <React.Fragment key={user.id}>
                                                <tr>
                                                    <td
                                                    // className='text-white'
                                                    >{user.name.first} {user.name.last}</td>


                                                    {/* <td className='text-white'>{user.role}</td> */}
                                                    <td
                                                    // className='text-white'
                                                    >{user.email}</td>
                                                    <td
                                                    // className='text-white'
                                                    // >{user.password}</td>
                                                    // <td
                                                    // className='text-white'
                                                    >

                                                        <button className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                // const id = user._id;
                                                                navigate('/edit-user',
                                                                    { state: { user } })
                                                            }}

                                                        >
                                                            <DualIcon iconName="edit" />
                                                        </button>
                                                    </td>
                                                    <td className='text-white'>
                                                        <button className="btn btn-danger btn-sm"

                                                            onClick={() => handleDelete(user._id)}

                                                        >
                                                            <DualIcon iconName="trash" />
                                                        </button>
                                                    </td>
                                                </tr>

                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>





                        </div>
                    </div>
                </section>
            </header>

        </div >

    )
}

export default UserManagement




