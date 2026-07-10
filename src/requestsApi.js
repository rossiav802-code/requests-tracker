import { supabase } from './supabaseClient';

export async function getRequests() {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка при получении заявок:', error);
    return [];
  }

  return data;
}