// src/features/topics/topicsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topics: [],
  selectedTopics: [],
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    toggleTopic: (state, action) => {
      const topic = action.payload;
      if (state.selectedTopics.includes(topic)) {
        state.selectedTopics = state.selectedTopics.filter((t) => t !== topic);
      } else {
        state.selectedTopics.push(topic);
      }
    },
  },
});

export const { setTopics, toggleTopic } = topicsSlice.actions;

export default topicsSlice.reducer;
