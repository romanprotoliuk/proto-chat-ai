import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/utils/supabase';

export function useSupabaseAuth() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.supabaseAccessToken) {
      supabase.auth.setSession({
        access_token: session.supabaseAccessToken,
        refresh_token: '',
      });
    }
  }, [session]);

  return { supabase };
}