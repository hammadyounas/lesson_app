// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    if (session) {
      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (userError) throw userError;

      return { user: userProfile, email: session.user.email };
    } else {
      return { user: null, email: '' };
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    email: '',
    loading: false,
    error: null,
  },
  reducers: {
    clearUser(state) {  // Action to clear user state
      state.user = null; // Clear the entire user object
      state.email = '';  // Clear email
      state.loading = false; // Optional: reset loading state
      state.error = null;   // Optional: clear any errors
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const {  clearUser } = userSlice.actions;


export default userSlice.reducer;
