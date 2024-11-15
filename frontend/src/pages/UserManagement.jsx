import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import bootstrap from 'bootstrap';
import EditUser from './users/EditUser';
import { DualIcon } from '../helpers/DualIcon';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';




const UserManagement = () => {

    const UI_STATE = {
        ALL_USERS: 'ALL_USERS',
        EDIT_USER: 'EDIT_USER'
    };

    const [uiState, setUIState] = useState(UI_STATE.ALL_USERS);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const { API, setLoading } = useContext(GeneralContext);
    const navigate = useNavigate();


    // Fetch users 
    const fetchUsers = async () => {

        if (token) {

            try {
                const res = await axios.get(`${API}/users`,
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    }
                );
                setUsers(res.data);
            } catch (e) {
                console.log('Error fetching users:', e); // ניפוי שגיאות
            } finally {
                setLoading(false);
            }
        }
    };


    useEffect(() => {
        // Fetch users First time
        setLoading(true);
        fetchUsers();
    }, []);


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
                        <div className='frame'>


                            {uiState === UI_STATE.ALL_USERS &&


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
                                                                onClick={() =>
                                                                    setUIState(UI_STATE.EDIT_USER)}
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
                                                    {/* 
                                                {editingUserId === user.id && (
                                                    <tr>
                                                        <td colSpan="6">
                                                            <div className='text-white'>
                                                                <h3>עריכת משתמש</h3>
                                                                <form>
                                                                    <div className="form-group">
                                                                        <label htmlFor="name">שם:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="name"
                                                                            name="name"
                                                                            value={editedUser.name}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="role">תפקיד:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="role"
                                                                            name="role"
                                                                            value={editedUser.role}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="email">מייל:</label>
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            id="email"
                                                                            name="email"
                                                                            value={editedUser.email}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="password">סיסמא:</label>
                                                                        <input
                                                                            type="password"
                                                                            className="form-control"
                                                                            id="password"
                                                                            name="password"
                                                                            value={editedUser.password}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                    <button type="button" className="btn btn-success" style={{ marginLeft: '30px' }} onClick={handleSaveEdit}>
                                                                        שמור שינויים
                                                                    </button>
                                                                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                                                                        ביטול
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )} */}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            }



                            {uiState === UI_STATE.EDIT_USER &&
                                <EditUser />
                            }


                            {/* <div className='text-end' style={{ marginBottom: '30px' }}>
                                <button className="btn btn-primary btn-lg text-dark"
                                //  onClick={handleAddUserClick}
                                >
                                    הוסף משתמש
                                </button>
                            </div> */}


                            {/* {users.map(
                                user => (
                                    <div key={user._id}>
                                        <h3>{user.name.first} {user.name.last}</h3>
                                        <p>{user.email}</p>
                                        {user.isAdmin && (
                                            <button onClick={() => handleAdminToggle(user._id)}>Toggle Admin</button>
                                        )} */}
                            {/* {!user.isAdmin && (
                            <button onClick={() => handleAdminToggle(user._id)}>Make Admin</button>
                        )} */}
                            {/* {user.isBusiness && (
                                            <button onClick={() => handleBusinessToggle(user._id)}>Toggle Business</button>
                                        )} */}
                            {/* {!user.isBusiness && (
                            <button onClick={() => handleBusinessToggle(user._id)}>Make Business</button>
                        )} */}
                            {/* </div> */}
                            {/* ) */}
                            {/* )} */}
                        </div>
                    </div>
                </section>
            </header>

        </div>

    )
}

export default UserManagement





{/* 
                    <header id="allUsers" className="masthead">
                        <section className="d-flex align-items-center">
                            <div className="container position-relative">
                                <h1>כל המשתמשים</h1>
                                <div className='frame'>

                                    <div className='text-end' style={{ marginBottom: '30px' }}>
                                        <button className="btn btn-primary btn-lg text-dark" onClick={handleAddUserClick}>
                                            הוסף משתמש
                                        </button>
                                    </div>

                                    {showAddUserForm && (
                                        <div className='text-white mb-5'>
                                            <h3>הוסף משתמש חדש</h3>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="newName">שם:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="newName"
                                                        name="name"
                                                        value={newUser.name}
                                                        onChange={handleInputChangeNewUser}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="newRole">תפקיד</label>
                                                    <select
                                                        className="form-control"
                                                        id="newRole"
                                                        name="role"
                                                        value={newUser.role}
                                                        onChange={handleInputChangeNewUser}
                                                        required
                                                    >
                                                        <option value="">בחר תפקיד</option>
                                                        <option value="user">משתמש רגיל</option>
                                                        <option value="admin">מנהל</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="newEmail">מייל</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="newEmail"
                                                        name="email"
                                                        value={newUser.email}
                                                        onChange={handleInputChangeNewUser}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="newPassword">סיסמא</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="newPassword"
                                                        name="password"
                                                        value={newUser.password}
                                                        onChange={handleInputChangeNewUser}
                                                    />
                                                </div>
                                                <button type="button" className="btn btn-success" style={{ marginLeft: '30px' }} onClick={handleSaveNewUser}>
                                                    שמור משתמש חדש
                                                </button>
                                                <button type="button" className="btn btn-secondary" onClick={handleCancelAdd}>
                                                    ביטול
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    <div>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className='text-white'>שם</th>
                                                    <th className='text-white'>תפקיד</th>
                                                    <th className='text-white'>מייל</th>
                                                    <th className='text-white'>סיסמא</th>
                                                    <th className='text-white'>עריכת משתמש</th>
                                                    <th className='text-white'>מחיקת משתמש</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <React.Fragment key={user.id}>
                                                        <tr>
                                                            <td className='text-white'>{user.name}</td>
                                                            <td className='text-white'>{user.role}</td>
                                                            <td className='text-white'>{user.email}</td>
                                                            <td className='text-white'>{user.password}</td>
                                                            <td className='text-white'>
                                                                <button className="btn btn-success btn-sm" onClick={() => handleEditClick(user)}>
                                                                    ערוך
                                                                </button>
                                                            </td>
                                                            <td className='text-white'>
                                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                                                                    מחק
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        {editingUserId === user.id && (
                                                            <tr>
                                                                <td colSpan="6">
                                                                    <div className='text-white'>
                                                                        <h3>עריכת משתמש</h3>
                                                                        <form>
                                                                            <div className="form-group">
                                                                                <label htmlFor="name">שם:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="name"
                                                                                    name="name"
                                                                                    value={editedUser.name}
                                                                                    onChange={handleInputChange}
                                                                                />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="role">תפקיד:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="role"
                                                                                    name="role"
                                                                                    value={editedUser.role}
                                                                                    onChange={handleInputChange}
                                                                                />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="email">מייל:</label>
                                                                                <input
                                                                                    type="email"
                                                                                    className="form-control"
                                                                                    id="email"
                                                                                    name="email"
                                                                                    value={editedUser.email}
                                                                                    onChange={handleInputChange}
                                                                                />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="password">סיסמא:</label>
                                                                                <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    id="password"
                                                                                    name="password"
                                                                                    value={editedUser.password}
                                                                                    onChange={handleInputChange}
                                                                                />
                                                                            </div>
                                                                            <button type="button" className="btn btn-success" style={{ marginLeft: '30px' }} onClick={handleSaveEdit}>
                                                                                שמור שינויים
                                                                            </button>
                                                                            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                                                                                ביטול
                                                                            </button>
                                                                        </form>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </header>


                    )
} */}


