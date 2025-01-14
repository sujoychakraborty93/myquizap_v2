import React, { useState } from 'react';
import '../css/Register.css';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});


const Register = ({ setLoggedIn }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', { name, email, password });
            setMessage(response.data.message);
            if (response.data.message === 'User registered successfully') {
                setLoggedIn(true);
            }
        } catch (error) {
            console.error('Error registering:', error);
            setMessage('Error registering user');
        }
    };

    return (
        <section className='register'>
            <div className='contentbox'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className='contentboxitem' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required/>
                    </div>
                    <br/>
                    <div>
                        <input className='contentboxitem' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
                    </div>
                    <br/>
                    <div>
                        <input className='contentboxitem' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                    </div>
                    <br/>
                    <div>
                        <button className='contentboxitem' type="submit">Register</button>
                    </div>
                    <br/>
                    <div>
                        <a href="/login">Back to Login</a>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
            </section>
    );
};

export default Register;
