// lib/auth.js
import { supabase } from "../lib/supabase";
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function registerUser(email, password, firstName, lastName) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const {
      data: { user },
      error: signupError,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) throw signupError;

    const { error: insertError } = await supabase.from("user_profiles").insert([
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
    return { error };
  }
}

export async function loginUser(email, password) {
  try {
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateAuthUser(email, password) {
  try {
 
    const updates = {};
    const { error: updateError } = await supabase.auth.updateUser(updates);

    if (updateError) throw updateError;

    return { message: "Authentication credentials updated successfully" };
  } catch (error) {
    return { error };
  }
}


// Request Password Reset
export async function requestPasswordReset(email) {
  try {
    // Send the password reset email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}`,
    });

    if (resetError) throw resetError;

    return { message: "Password reset email sent successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

// Reset Password
export async function resetPassword(email, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Check if user exists
    const { data: user, error: fetchUserError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (fetchUserError || !user) {
      throw new Error("User not found");
    }

    // Use Supabase Admin API to update the password in the Auth system
    const { error: authUpdateError } = await adminSupabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
    });

    if (authUpdateError) {
      throw new Error("Failed to update password in the authentication system");
    }

    // Update user password in the profile
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ password: hashedPassword })
      .eq("id", user.id);

    if (updateError) {
      throw new Error("Error updating password in the database");
    }

    return { message: "Password has been reset successfully" };
  } catch (error) {
    return { error: error.message };
  }
}