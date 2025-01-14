import React from 'react';
import '../css/Header.css';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';

function Header() {
    return(
        // <Router>
        <div>
            {/* <header className="header">
                <nav className="navbar">
                    <ul className='menu'>
                        <li activeClassName="active" className="menu-item"><Link to="/">Home</Link></li>
                        <li activeClassName="active" className="menu-item"><Link to="/playnow">Play Now</Link></li>
                        <li activeClassName="active" className="menu-item"><Link to="/my-scores">My Scores</Link></li>
                        <li activeClassName="active" className="menu-item"><Link to="/profile">Profile</Link></li>
                        <li activeClassName="active" className="menu-item"><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header> */}
            <header className="header">
                <nav className="navbar">
                    <ul className='menu'>
                        <li><NavLink exact to="/" activeClassName="active" className="nav-item">Home</NavLink></li>
                        <li><NavLink exact to="/playnow" activeClassName="active" className="nav-item">Play Now</NavLink></li>
                        {/* <li><NavLink exact to="/myscores" activeClassName="active" className="nav-item">My Scores</NavLink></li> */}
                        <li><NavLink exact to="/profile" activeClassName="active" className="nav-item">Profile</NavLink></li>
                        <li><NavLink exact to="/logout" activeClassName="active" className="nav-item">Logout</NavLink></li>
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