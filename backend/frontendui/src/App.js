import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import logo from './Assets/logo.png';
import config from './config';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/Login';
import Register from './js/Register';
import ForgotPassword from './js/ForgotPassword';
import Home from './js/Home';
import PlayNow from './js/PlayNow';
import MyScores from './js/MyScores';
import Profile from './js/Profile';
import Logout from './js/Logout';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: config.apiUrl,
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// const basic = () => {
//   return (
//     <div className="App">
//       <Header/>
//       <Footer/>
//     </div> )
// }

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
    <div className="App">
      <Router>
        {loading ? (
                  <p>Loading...</p>
              ) : (
                  // <Routes>
                  //     <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} />} />
                  //     <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register setLoggedIn={setLoggedIn} />} />
                  //     <Route path="/forgotpassword" element={<ForgotPassword />} />
                  //     <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
                  //     {/* <Route path="/" element={loggedIn ? basic() : <Navigate to="/login" />} /> */}
                  //     <Route path="/playnow" element={loggedIn ? <PlayNow /> : <Login setLoggedIn={setLoggedIn} />}/>
                  //     {/* <Route path="/myscores" element={loggedIn ? <MyScores /> : <Login setLoggedIn={setLoggedIn} />}/> */}
                  //     <Route path="/profile" element={loggedIn ? <Profile /> : <Login setLoggedIn={setLoggedIn} />}/>
                  //     <Route path="/logout" element={<Logout />}/>
                  // </Routes>
                  <Routes>
                      <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} />} />
                      <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register setLoggedIn={setLoggedIn} />} />
                      <Route path="/forgotpassword" element={<ForgotPassword />} />
                      <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
                      {/* <Route path="/" element={loggedIn ? basic() : <Navigate to="/login" />} /> */}
                      <Route path="/playnow" element={loggedIn ? <PlayNow /> : <Login setLoggedIn={setLoggedIn} />}/>
                      {/* <Route path="/myscores" element={loggedIn ? <MyScores /> : <Login setLoggedIn={setLoggedIn} />}/> */}
                      <Route path="/profile" element={loggedIn ? <Profile /> : <Login setLoggedIn={setLoggedIn} />}/>
                      <Route path="/logout" element={<Logout />}/>
                  </Routes>
              )}
      </Router>
      </div>
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
