// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // Async thunk to fetch user data
// export const fetchUser = createAsyncThunk(
//   "user/fetchUser",
//   async (userId, { rejectWithValue }) => {
//     try {
//       if (!userId) throw new Error("User ID is required");
//       const response = await axios.get(`${API_URL}/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// // Async thunk to update user profile
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ userId, firstName, lastName, email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${API_URL}/user`, {
//         userId,
//         firstName,
//         lastName,
//         email,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Update user error:', error);
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// // Async thunk to delete user profile
// export const deleteUser = createAsyncThunk(
//   "user/deleteUser",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`${API_URL}/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// // Async thunk to register user
// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/register`, {
//         email,
//         password,
//         firstName,
//         lastName,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// // Async thunk to login user
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, {
//         email,
//         password,
//       });
//       return {
//         user: response.data.data.user,
//         session: response.data.data.session,
//       };
//     } catch (error) {
//       console.error('Login error:', error.response.data);
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// // Async thunk to request password reset
// export const requestPasswordReset = createAsyncThunk(
//   "user/requestPasswordReset",
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/request-password-reset`, {
//         email,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async ({ email, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/reset-password`, {
//         email,
//         newPassword,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: null,
//     session: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearUser: (state) => {
//       state.user = null;
//       state.session = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.loading = false;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.loading = false;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUser.fulfilled, (state) => {
//         state.user = null;
//         state.session = null;
//         state.loading = false;
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.session = action.payload.session;
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(requestPasswordReset.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(requestPasswordReset.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(requestPasswordReset.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearUser } = userSlice.actions;
// export default userSlice.reducer;

// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase, adminSupabase } from "../../lib/supabase";
import bcrypt from "bcryptjs";

// Utility function to hash passwords
const hashPassword = async (password) => {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(password, SALT_ROUNDS);
};

// Utility function to compare passwords
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

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

// Async thunk to register a new user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const hashedPassword = await hashPassword(password);

      const {
        data: { user },
        error: signupError,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) throw signupError;

      const { error: insertError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashedPassword,
          },
        ]);

      if (insertError) throw insertError;

      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to login a user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      const userId = data.user.id;

      const { data: user, error: fetchError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) throw fetchError;

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update user profile including profile picture
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { firstName, lastName, email, password, profilePictureFile }, // Accept the profile picture file as a parameter
    { getState, rejectWithValue }
  ) => {
    try {
      const { user: currentUser } = getState().user;

      // Fetch the current user profile to verify existing password
      const { data: userProfile, error: fetchError } = await supabase
        .from("user_profiles")
        .select("password")
        .eq("id", currentUser.id)
        .single();

      if (fetchError) throw fetchError;

      // Check if the new password is different from the current one
      if (password) {
        const isSamePassword = await comparePassword(
          password,
          userProfile.password
        );
        if (isSamePassword) {
          throw new Error(
            "New password cannot be the same as the current password."
          );
        }
      }

      const authUpdates = {};
      if (email && email !== currentUser.email) authUpdates.email = email;
      if (password) authUpdates.password = password;

      // Update email or password if needed in Supabase auth
      if (Object.keys(authUpdates).length > 0) {
        const { error: authUpdateError } = await supabase.auth.updateUser(
          authUpdates
        );
        if (authUpdateError) throw authUpdateError;
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await hashPassword(password);
      }

      let profilePictureUrl;
      
      if (profilePictureFile) {
        // Upload profile picture to Supabase storage
        const fileName = `${currentUser.id}/${profilePictureFile.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from("profile-pictures")
          .upload(fileName, profilePictureFile);

        if (uploadError) throw uploadError;

        // Get the public URL of the uploaded image
        const { data: publicUrlData, error: publicUrlError } =
          await supabase.storage
            .from("profile-pictures")
            .getPublicUrl(fileName);

        if (publicUrlError) throw publicUrlError;

        profilePictureUrl = publicUrlData.publicUrl;
      }

      // Update user profile information in the database
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashedPassword || undefined,
          profile_picture_url: profilePictureUrl || undefined, // Add profile picture URL if available
        })
        .eq("id", currentUser.id);

      if (profileError) throw profileError;

      // Return the updated user details, including the profile picture URL
      return {
        user: {
          firstName,
          lastName,
          email,
          profile_picture_url:
            profilePictureUrl || currentUser.profile_picture_url, // Return existing or new profile picture URL
        },
        email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete user profile
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user: currentUser } = getState().user;

      const { error: authDeleteError } =
        await adminSupabase.auth.admin.deleteUser(currentUser.id);

      if (authDeleteError) throw authDeleteError;

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

// Async thunk to request password reset
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const { data: user, error: userError } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !user) {
        throw new Error("Invalid Email");
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `http://localhost:3000/reset-password?email=${encodeURIComponent(
            email
          )}`,
        }
      );

      if (resetError) throw resetError;

      return { message: "Password reset email sent successfully" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to reset password using the provided email and new password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const hashedPassword = await hashPassword(newPassword);

      const { data: user, error: fetchUserError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchUserError || !user) throw new Error("User not found");

      const { error: authUpdateError } =
        await adminSupabase.auth.admin.updateUserById(user.id, {
          password: newPassword,
        });

      if (authUpdateError) throw authUpdateError;

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ password: hashedPassword })
        .eq("id", user.id);

      if (updateError) throw updateError;

      return { message: "Password has been reset successfully" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Async thunk to upload profile picture and update user profile
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async ({ userId, profilePictureFile }, { rejectWithValue }) => {
    try {
      // Upload image to the Supabase storage bucket
      const fileName = `${userId}/${profilePictureFile.name}`; // Store image in a folder named after the user ID
      const { data, error: uploadError } = await supabase.storage
        .from("profile-pictures") // Make sure this bucket exists
        .upload(fileName, profilePictureFile);

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded image
      const { data: publicUrlData, error: publicUrlError } =
        await supabase.storage.from("profile-pictures").getPublicUrl(fileName);

      if (publicUrlError) throw publicUrlError;

      const profilePictureUrl = publicUrlData.publicUrl;

      // Update user profile with the new profile picture URL
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ profile_picture_url: profilePictureUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      return { profilePictureUrl };
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
    message: "",
  },
  reducers: {
    clearUser(state) {
      state.user = null;
      state.email = "";
      state.loading = false;
      state.error = null;
      state.message = "";
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
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
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.user.profile_picture_url = action.payload.profilePictureUrl;
        state.loading = false;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
