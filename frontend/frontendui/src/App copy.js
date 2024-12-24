import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import logo from './Assets/logo.png';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/Login';
import Register from './js/Register';
import config from './config';

const api = axios.create({
  baseURL: config.apiUrl,
  // baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const basic = () => {
  return (
    <div className="App">
      <Header/>
      <Footer/>
      {/* <div>this is homepage</div> */}
    </div> )
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log('NODE_ENV: ', NODE_ENV)
  console.log('process url ', process.env.REACT_APP_API_URL)

  useEffect(() => {
      checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
      try {
          const response = await api.get('/check-auth');
          console.log("loged in: ", response.data.loggedIn)
          setLoggedIn(response.data.loggedIn);
          setLoading(false);
      } catch (error) {
          console.error('Error checking authentication:', error);
          setLoading(false);
      }
  };

  return (
    <Router>
      {loading ? (
                <p>Loading...</p>
            ) : (
                <Routes>
                    <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} />} />
                    <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register setLoggedIn={setLoggedIn} />} />
                    {/* <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} /> */}
                    <Route path="/" element={loggedIn ? basic() : <Navigate to="/login" />} />
                </Routes>
            )}
      
    </Router>
  );
}
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <nav>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/playnow">Play Now</Link></li>
//               <li><Link to="/my-scores">My Scores</Link></li>
//               <li><Link to="/profile">Profile</Link></li>
//             </ul>
//           </nav>
//         </header>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/playnow" element={<PlayNow />} />
//           <Route path="/my-scores" element={<MyScores />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//         <footer className="App-footer">
//           <ul>
//             <li><a href="/contact">Contact Us</a></li>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/privacy">Privacy Policy</a></li>
//             <li><a href="/cookie">Cookie Policy</a></li>
//             <li><a href="/social-media">Social Media</a></li>
//           </ul>
//         </footer>
//       </div>
//     </Router>
//   );
// }

export default App;
