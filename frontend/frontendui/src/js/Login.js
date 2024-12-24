import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import '../css/Login.css';
import config from '../config';

const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
  baseURL: config.apiUrl,
  withCredentials: true,
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 500) {
        // window.location.href = '/login';
        sessionStorage.clear();
        document.cookie = 'auth_token=; Max-Age=0'; // Clear cookie
      }
      return Promise.reject(error);
    }
);


function Login ({ setLoggedIn }) {
    const dispatch = useDispatch();

    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            // const response = await api.post('http://localhost:4000/api/login', { email, password });
            setMessage(response.data.message);
            if (response.data.message === 'Logged in successfully') {
                setLoggedIn(true);
                console.log("login -> response.data -> ", response.data)
                // setName(response.data.name)
                let name = response.data.name
                let userId = response.data.userId
                // Dispatch the user details to the Redux store
                dispatch(setUser({userId, name, email}));
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Invalid credentials');
        }
    };

    return (
        <section className="login">
            <div className='contentbox'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div >
                        <input className='contentboxitem' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
                    </div>
                    <br/>
                    <div >
                        <input className='contentboxitem' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                    </div>
                    <br/>
                    <div>
                        <button type="submit" className='contentboxitem'>Login</button>
                    </div>
                    <br/>
                    <div>
                        <a href="/forgotpassword">Forgot Password</a>
                    </div>
                    <br/>
                    <div>
                        <a href="/register">Create New Account</a>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </section>
    );

    // return (
    //     <section className="login">
    //         <div className='contentbox'>
    //             <h2>Login</h2>
    //             <form onSubmit={handleSubmit}>
    //                 <div>
    //                     <label>Email:</label>
    //                     <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
    //                 </div>
    //                 <div>
    //                     <label>Password:</label>
    //                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
    //                 </div>
    //                 <button type="submit">Login</button>
    //                 <br/>
    //                     Do not have an account? <a href="/register">Register</a>
    //                     <a href="/forgotpassword">Forgot Password</a>
                    
    //             </form>
    //             {message && <p>{message}</p>}
    //         </div>
    //     </section>
    // );
};

export default Login;
