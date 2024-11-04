import { supabase } from './supabase';

export async function signInWithSupabase(userId: string) {
  // Create a unique email-like identifier from the Twitter ID
  const email = `${userId}@twitter.supabase`;
  const password = userId; // Using userId as password for simplicity

  // Try to sign in
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If user doesn't exist, sign them up
  if (signInError?.status === 400) {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          provider: 'twitter',
          provider_id: userId,
        }
      }
    });

    if (signUpError) throw signUpError;
    return signUpData;
  }

  if (signInError) throw signInError;
  return data;
}