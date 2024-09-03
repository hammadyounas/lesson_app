// lib/auth.js
import { supabase } from "../lib/supabase"; 

export async function registerUser(email, password, firstName, lastName) {
    try {
    
      const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signupError) throw signupError;
  
    
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: user.id, 
            first_name: firstName,
            last_name: lastName,
            email: email
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


    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateAuthUser(email, password) {
  try {
      const { error: updateError } = await supabase.auth.updateUser({
          email: email || undefined,  
          password: password || undefined, 
      });

      if (updateError) throw updateError;

      return { message: "Authentication credentials updated successfully" };
  } catch (error) {
      return { error };
  }
}
