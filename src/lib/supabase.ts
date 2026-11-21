import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Strip any wrapping quotes (e.g. "..." or '...') and trailing slashes
const cleanUrl = rawUrl.replace(/^["']|["']$/g, '').trim().replace(/\/+$/, '');
const cleanKey = rawKey.replace(/^["']|["']$/g, '').trim();

export const isSupabaseConfigured = Boolean(
  cleanUrl &&
  cleanKey &&
  cleanUrl.startsWith('https://') &&
  !cleanUrl.includes('your-project') &&
  !cleanUrl.includes('placeholder') &&
  !cleanKey.includes('placeholder')
);

// Fallback dummy URL/key so createClient doesn't throw at bundle initialization if unconfigured
const effectiveUrl = isSupabaseConfigured ? cleanUrl : 'https://dummy-portfolio.supabase.co';
const effectiveKey = isSupabaseConfigured ? cleanKey : 'dummy-anon-key-placeholder';

export const supabase: SupabaseClient = createClient(effectiveUrl, effectiveKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
