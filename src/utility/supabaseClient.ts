import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://hondwvrxgavoswhdpvia.supabase.co";
const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbmR3dnJ4Z2F2b3N3aGRwdmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4ODg3NDcsImV4cCI6MjAwNDQ2NDc0N30.nEAiTwBGl1MYvtcuaZJlgS6-nj9x8b2OyRIYdvEzMnc";
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
