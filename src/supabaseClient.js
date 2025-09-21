// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://brpwnawathmqpkfriflo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJycHduYXdhdGhtcXBrZnJpZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTU5ODEsImV4cCI6MjA3NDAzMTk4MX0.Nj4x4CLJXsOwL5yJ1dOVB6fG-A_Q_HHrUWXJxsqg_Dg";

export const supabase = createClient(supabaseUrl, supabaseKey);
