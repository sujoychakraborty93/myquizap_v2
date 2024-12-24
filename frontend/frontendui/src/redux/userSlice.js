import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userId: "",
    name: "",
    email: "",
  },
  userScore: {
    score: 0,
    questionsAttemptedCount: 0
  },
  isEditable: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'userSliceName',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    // state.user.name = action.payload.name
    // state.user.email = action.payload.email
      console.log("userSlice -> setuser -> ", state.user)
    },
    // login: (state, action) => {
    //   state.user.userId = action.payload.userId;
    //   state.user.name = action.payload.username;
    //   state.user.email = action.payload.email;
    //   state.isAuthenticated = true;
    // },
    logout: (state) => {
      state.user.name = '';
      state.user.email = '';
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user.name = action.payload.name;
      console.log("userSlice -> updateUser -> ", state.user)
    },
    setScore: (state, action) => {
        state.user = action.payload;
    },
    updateScore: (state, action) => {
        // state.userScore = action.payload;
        state.userScore.score += action.payload.score;
        state.userScore.questionsAttemptedCount += 1;
    },
    resetProgress: (state) => {
        state.userScore.score = 0;
        state.userScore.questionsAttemptedCount = 0;
    },
    toggleEdit: (state) => {
        state.isEditable = !state.isEditable;
    },
  },
});
// const userSlice = createSlice({
//     name: 'user',
//     initialState: initialState.user,
//     reducers: {
//       setUser: (state, action) => {
//         return {...state, name: action.payload.name, email: action.payload.email}
//         // console.log("userSlice -> setuser -> ", state.user)
//       },
//       updateUser: (state, action) => {
//         console.log("userSlice -> updateUser -> ", action.payload.name)
//         return {
//             ...state, 
//             name: action.payload.name,
//             email: action.payload.email,
//         }
//         // state.user = { ...state.user, ...action.payload };
        
//       },
//       updateScore: (state, action) => {
//         return {
//             ...state,
//             score: action.payload.score,
//             questionsAttemptedCount: action.payload.score,
//         }
//       },
//       resetProgress: (state) => {
//           return {
//             ...state,
//             score: 0,
//             questionsAttemptedCount: 0,
//           }
//       }
//     },
//   });

export const { setUser, logout, updateUser, setScore, updateScore, resetProgress, toggleEdit} = userSlice.actions;

export default userSlice.reducer;
