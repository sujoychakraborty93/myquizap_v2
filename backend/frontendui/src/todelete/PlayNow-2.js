// import React from 'react'
// import Question from './Question'

// function PlayNow() {
//   return (
//     <div className="playnow">
//       <section className="quiz-section">
//         <div className="quiz-box">
//           <h2>Question</h2>
//           <p>Placeholder topic for the quiz.</p>
//           <Question />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default PlayNow

// src/components/PlayNow.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './Filters';
import Question from './Question';
import { setQuestions } from '../redux/questionsSlice';
import { setTopics } from '../redux/topicsSlice';
import { setRegions } from '../redux/regionsSlice';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import Footer from './Footer';

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

const PlayNow = () => {
  const dispatch = useDispatch();
  const selectedTopics = useSelector((state) => state.topicsStore.selectedTopics);
  const selectedRegions = useSelector((state) => state.regionsStore.selectedRegions);

  const fetchTopics = async () => {
    try {
      const responseTopics = await api.get('/topics');
      dispatch(setTopics(responseTopics.data));
      console.log('topics in /js/PlayNow: ', responseTopics.data)
    } catch (error) {
      console.error('Error fetching topics in /js/PlayNow: :', error);
    }
  };
  const fetchRegions = async () => {
    try {
      const responseRegions = await api.get('/regions');
      dispatch(setRegions(responseRegions.data));
      console.log('regions in /js/PlayNow: ',responseRegions.data)
    } catch (error) {
      console.error('Error fetching regions in /js/PlayNow: ', error);
    }
  };
  const fetchQuestions = async () => {
    try {
      const responseQuesions = await api.post('/questions', {
        topics: selectedTopics,
        regions: selectedRegions,
      });
      dispatch(setQuestions(responseQuesions.data));
      console.log('questions in /js/PlayNow: ', responseQuesions.data)
    } catch (error) {
      console.error('Error fetching questions in /js/PlayNow:', error);
    }
  };
  fetchTopics();
  console.log("done fetchTopics()")
  fetchRegions();
  console.log("done fetchRegions()")
  fetchQuestions();
  console.log("done fetchQuestions()")


  return (
    <div className='container'>
      <Header/>
      <Filters onSubmit={fetchQuestions} />
      <Question />
      <Footer/>
    </div>
  );
};

export default PlayNow;
