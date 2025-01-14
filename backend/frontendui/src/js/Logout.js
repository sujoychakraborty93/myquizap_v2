import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/Logout.css';
import config from '../config';

const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
});
const Logout = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userStore.user);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (user) {
            setUserId(user.userId);
        }
      }, [user]);

    const handleLogout = async () => {
        try {
            console.log("logout starting: ", Cookies)
            // await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
            const response = await api.post('/logout', {userId}, { withCredentials: true });
            Cookies.remove('auth_token');
            sessionStorage.clear();
            localStorage.clear();
            console.log("token", Cookies)
            dispatch(logout());
            // navigate('/login');
        } catch (error) {
            console.error('Logout error:', error.response.data.message);
        }
    };
    handleLogout();
    return (
        <section className='register'>
            <div className='contentbox'>
            <h2>You are logged Out</h2>
            <a href="/login"><button className='contentboxitem'>Login Page</button></a>
            </div>
        </section>
    )
};

export default Logout;
