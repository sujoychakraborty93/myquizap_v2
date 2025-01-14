// src/components/Filters.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTopics, toggleTopic } from '../redux/topicsSlice';
import { setRegions, toggleRegion } from '../redux/regionsSlice';
import axios from 'axios';
import config from '../config';
import '../css/PlayNow.css'

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

// boxClick = (e) => {
//   this.setState({
//     bgColor: "red"
//   })
// }


const Filters = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topicsStore.topics);
  const selectedTopics = useSelector((state) => state.topicsStore.selectedTopics);
  const regions = useSelector((state) => state.regionsStore.regions);
  const selectedRegions = useSelector((state) => state.regionsStore.selectedRegions);

  const [isSelected, setIsSelected] = useState(false)
  const handleTopicColor = () => {
    setIsSelected(!isSelected)
  }

  useEffect(() => {
    // Fetch topics and regions from the backend
    const fetchFilters = async () => {
      try {
        const topicsResponse = await api.get('/topics');
        dispatch(setTopics(topicsResponse.data));
        const regionsResponse = await api.get('/regions');
        dispatch(setRegions(regionsResponse.data));
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, [dispatch]);

  return (
    <div className='main-content'>
      <div className=''>
        <h3>Topics</h3>
        {topics.map((topic) => (
          <button 
            key={topic._id}
            onClick={() => handleTopicColor && dispatch(toggleTopic(topic))}
            style={{ backgroundColor: selectedTopics.includes(topic) || isSelected ? 'blue' : 'grey' }}
            // onClick={() => handleTopicColor}
            className={`button ${isSelected ? 'blue' : 'grey'}`}
          >
            {topic.topic_name}
          </button>
        ))}
      </div>
      <div>
        <h3>Regions</h3>
        {regions.map((region) => (
          <button
            key={region._id}
            style={{ backgroundColor: selectedRegions.includes(region) ? 'blue' : 'grey' }}
            onClick={() => dispatch(toggleRegion(region))}
          >
            {region.region_name}
          </button>
        ))}
      </div>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Filters;
