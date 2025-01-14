import React from 'react';
import '../css/Header.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Header() {
    return(
        // <Router>
        <div>
            <header className="header">
                <nav className="navbar">
                    <ul className='menu'>
                        <li className="menu-item"><Link to="/">Home</Link></li>
                        <li className="menu-item"><Link to="/playnow">Play Now</Link></li>
                        <li className="menu-item"><Link to="/my-scores">My Scores</Link></li>
                        <li className="menu-item"><Link to="/profile">Profile</Link></li>
                        <li className="menu-item"><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
            {/* <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playnow" element={<PlayNow />} />
                <Route path="/my-scores" element={<MyScores />} />
                <Route path="/profile" element={<Profile />} />
            </Routes> */}
        </div>
        // </Router>
    );
}

export default Header;