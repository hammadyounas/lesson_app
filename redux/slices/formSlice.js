// slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    age: '',
    duration: '',
    curriculum: '',
    topic: '',
    subject: '',
    indoorOutdoor: '',
    additional: '',
    difficulty: '',
    energy: '',
    noOfChildren: '',
    noOfAdults: '',
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
