import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zedliaibpxfxipqgotwq.supabase.co';
const supabaseAnonKey = 'sb_publishable_iiRZpVX92C2ZxwhvuHjYGw_4AB2xlZU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);