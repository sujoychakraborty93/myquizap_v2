import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForgotPassword.css';
import config from '../config';

const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
});

const ForgotPassword = ({setEmailValid}) => {
    const [email, setEmail] = useState('');
    // const [emailValid, setEmailValid] = useState(false);
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
            const response = await api.post('/forgotpassword', { email });
            setMessage(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            console.error('Forgot password error: ', error.response.data.message);
        }
    };

    return (
        <div>
            <section className="forgotpassword">
                {/* <div className='fp_item'> */}
                <div className='contentbox'>
                    <form onSubmit={handleForgotPassword}>
                        <h2>Forgot Password</h2>
                        <div>
                        <input className='contentboxitem' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <br/>
                        <div>
                        <button className='contentboxitem' type="submit">Send Reset Link</button>
                        </div>
                    </form>
                    <br/>
                    {message && <p>{message}</p>}
                    <a href="/login"><button className='contentboxitem' >Back to Login</button></a>
                </div>
                {/* <div class="break"></div> */}
                {/* <br></br> */}
                {/* <div className='fp_item'>{message && <p>{message}</p>} </div> */}
                {/* <div class="break"></div> */}
                {/* <br /> */}
                {/* <div className='fp_item'><a href="/login"><button>Login</button></a></div> */}
            </section>
        </div>
    );
};

export default ForgotPassword;
