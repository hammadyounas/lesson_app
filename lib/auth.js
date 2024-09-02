// lib/auth.js
import { supabase } from "../lib/supabase"; // Ensure this is your Supabase client setup

export async function registerUser(email, password, firstName, lastName) {
    try {
      // Attempt to sign up the user
      const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signupError) throw signupError;
  
      // Store additional user information in the `user_profiles` table
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: user.id, // Use the user ID from Supabase Auth
            first_name: firstName,
            last_name: lastName,
          },
        ]);
  
      if (insertError) throw insertError;
  
      // Return user data after successful signup
      return { user };
  
    } catch (error) {
      return { error };
    }
  }

export async function loginUser(email, password) {
  try {
    // Attempt to sign in the user
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) throw loginError;

    // Get the user ID
    const userId = data.user.id;

    // Fetch user details from your Supabase table
    const { data: user, error: fetchError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (fetchError) throw fetchError;

    // Return user data if role matches
    return { user };
  } catch (error) {
    return { error };
  }
}
