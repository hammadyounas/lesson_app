// store/responseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  response: '',
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse(state, action) {
      state.response = action.payload;
    },
    clearResponse(state) {
      state.response = '';
    },
  },
});

export const { setResponse, clearResponse } = responseSlice.actions;
export default responseSlice.reducer;
