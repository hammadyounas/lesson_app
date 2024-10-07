// slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    age: '',
    duration: '',
    curriculum: '',
    topic: '',
    subject: '',
    additional: '',
    difficulty: '',
    energy: '',
    fourCs: [],
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
