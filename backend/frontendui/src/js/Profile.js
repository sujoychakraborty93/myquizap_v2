// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../css/Profile.css';
import config from '../config';


const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

function Profile() {
    // const user = {
    //   photo: 'https://via.placeholder.com/150',
    //   name: 'John Doe',
    //   email: 'john.doe@example.com',
    //   phone: '123-456-7890',
    //   level: 'Advanced',
    // };
    const { questions, currentQuestionIndex, score, questionsAttemptedCount} = useSelector((state) => state.questionsStore);
    const user = useSelector((state) => state.userStore.user);
    const userScore = useSelector((state) => state.userStore.userScore);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Backup to revert changes if canceled
    const [backupName, setBackupName] = useState('');
    const [backupEmail, setBackupEmail] = useState('');

    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setBackupName(user.name);
        setBackupEmail(user.email);
      }
    }, [user]);

    const handleCancel = () => {
      setName(backupName);
      setEmail(backupEmail);
      setEditMode(false);
    };

    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleSave = async () => {
      try {
        const response = await api.put('/profile', { name, email }, { withCredentials: true });
        dispatch(updateUser({name, email}));
        setEditMode(false);
      } catch (error) {
        console.error('Failed to update profile:', error.response?.data?.message);
      }
    };

    return (
      <div>
        <Header />
        <div className="profile-container">
          {/* <section className="profile-section">
            <div className="profile-photo">
              <img src={user.photo} alt="User" />
            </div>
            <div className="profile-details">
              <h2>{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Level:</strong> {user.level}</p>
            </div>
          </section> */}
          
            <h2>Profile</h2>
            <div className='profile-details'>
              <div className='profile-field'>
                <label>Name:</label>
                {editMode ? (
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                  <p>{user.name}</p>
                )}
                <span className="edit-icon" onClick={handleEdit}>&#9998;</span> {/* Pen icon for editing */}
              </div>
              <div className='profile-field'>
                <label>Email:</label>
                {/* {editMode ? (
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                ) : (
                  <p>{user?.email}</p>
                )} 
                <span className="edit-icon" onClick={handleEdit}>&#9998;</span>  */}
                
                  <p>{user?.email}</p>
                
              </div>
              {/* {editMode ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={handleEdit}>Edit</button>
              )} */}
              {editMode && (
                <div className="edit-buttons">
                  <button className="save-button" onClick={handleSave}>Save</button>
                  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
              )}
            </div>
            <div className="stats-details">
              <h3>User Stats</h3>
              <div className="stats-field">
                <label>Score:</label>
                <p>{score}</p>
              </div>
              <div className='stats-field'>
                <label>Questions Attempted:</label>
                <p>{questionsAttemptedCount}</p>
              </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
}

export default Profile;
