// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session) {
        const { data: userProfile, error: userError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (userError) throw userError;

        return { user: userProfile, email: session.user.email };
      } else {
        return { user: null, email: "" };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update user profile
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const {
        data: { user },
        error: updateError,
      } = await supabase.auth.updateUser({
        data: { name, email, password },
      });
      if (updateError) throw updateError;

      // Assuming user_profiles has name and email columns
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({ first_name: firstName, last_name: lastName, email })
        .eq("id", user.id);

      if (profileError) throw profileError;

      return { user: { firstName, lastName, email }, email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
        error: deleteError,
      } = await supabase.auth.signOut();
      if (deleteError) throw deleteError;

      // Optionally delete user profile from user_profiles table
      const { error: profileError } = await supabase
        .from("user_profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) throw profileError;

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    email: "",
    loading: false,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.user = null;
      state.email = "";
      state.loading = false;
      state.error = null;
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
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.email = "";
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
