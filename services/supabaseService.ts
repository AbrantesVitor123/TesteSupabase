
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, CLICK_TABLE_NAME, CLICK_COUNTER_ID } from '../constants';

// Fix: Use the imported `createClient` from `@supabase/supabase-js` instead of a global `supabase` object.
let supabaseClient: SupabaseClient | null = null;

if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const getSupabaseClient = (): SupabaseClient => {
    if (!supabaseClient) {
        throw new Error("Supabase client not initialized. Please provide your Supabase URL and Anon Key in constants.ts.");
    }
    return supabaseClient;
}


export const getClickCount = async (): Promise<number> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(CLICK_TABLE_NAME)
    .select('count')
    .eq('id', CLICK_COUNTER_ID)
    .single();

  if (error) {
    console.error('Error fetching click count:', error);
    throw new Error('Could not fetch click count. Please ensure your Supabase table "clicks" is set up correctly with a row where id=1.');
  }

  return data?.count ?? 0;
};

export const updateClickCount = async (newCount: number): Promise<void> => {
  const client = getSupabaseClient();
  const { error } = await client
    .from(CLICK_TABLE_NAME)
    .update({ count: newCount })
    .eq('id', CLICK_COUNTER_ID);

  if (error) {
    console.error('Error updating click count:', error);
    throw new Error('Failed to save the click count to the database.');
  }
};
