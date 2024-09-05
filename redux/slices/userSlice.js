// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase, adminSupabase } from "../../lib/supabase";
import bcrypt from 'bcryptjs';


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
  async ({ firstName, lastName, email, password }, { getState, rejectWithValue }) => {
    try {
      const { user: currentUser } = getState().user;

      const { data: userProfile, error: fetchError } = await supabase
        .from("user_profiles")
        .select("password")
        .eq("id", currentUser.id)
        .single();

      if (fetchError) throw fetchError;

      if (password) {
        const isSamePassword = await bcrypt.compare(password, userProfile.password);
        if (isSamePassword) {
          throw new Error("New password cannot be the same as the current password.");
        }
      }

      const authUpdates = {};
      if (email && email !== currentUser.email) authUpdates.email = email;
      if (password) authUpdates.password = password;

      if (Object.keys(authUpdates).length > 0) {
        const { error: authUpdateError } = await supabase.auth.updateUser(authUpdates);
        if (authUpdateError) throw authUpdateError;
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10); 
      }


      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          email, 
          password: hashedPassword || undefined, 
        })
        .eq("id", currentUser.id);

      if (profileError) throw profileError;

 
      return { user: { firstName, lastName, email }, email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user: currentUser } = getState().user;

      const { error: authDeleteError } = await adminSupabase.auth.admin.deleteUser(currentUser.id);

      if(authDeleteError) throw ("Profile not deleted:", authDeleteError);

      const { error: profileError } = await supabase
        .from("user_profiles")
        .delete()
        .eq("id", currentUser.id);

      if (profileError) throw profileError;

      return currentUser; 
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
