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
