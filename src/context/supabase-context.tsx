'use client';

import { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';


const SupabaseContext = createContext(supabase);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}