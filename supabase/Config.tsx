// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmyfxsjemuzuucwuilnp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJteWZ4c2plbXV6dXVjd3VpbG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTg3ODcsImV4cCI6MjA2NzA3NDc4N30.KNpsDzawGDnLMLZ1yiFwQvqm0zISRDegrzQgUJ8O9b8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
