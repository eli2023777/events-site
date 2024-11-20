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
    useEffect(() => {
        if (token) {
            callAPI(METHOD.GET_ALL, 'users');
        }
    }, []);


    useEffect(() => {
        if (data)
            if (Array.isArray(data)) { // GET users case (Array)
                setUsers(data);
            } else { // Delete user case (NOT Array)
                setUsers(prevUsers => prevUsers.filter((user) => user._id !== data._id));
                alert('User successfully Deleted');
            }
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
        callAPI(METHOD.DELETE, 'users', id);

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
                                            >Full Name</th>


                                            <th

                                            >Email</th>
                                            <th

                                            >Edit</th>
                                            <th
                                            >Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <React.Fragment key={user.id}>
                                                <tr>
                                                    <td
                                                    >{user.name.first} {user.name.last}</td>


                                                    <td
                                                    >{user.email}</td>
                                                    <td

                                                    >

                                                        <button className="btn btn-success btn-sm"
                                                            onClick={() => {
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




