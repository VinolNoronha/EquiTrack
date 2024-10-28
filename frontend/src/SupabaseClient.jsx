// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ltiqoijzszvqyfligzyy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aXFvaWp6c3p2cXlmbGlnenl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NjI3NzksImV4cCI6MjA0NTUzODc3OX0.GVYMOZ0jaPWI3d9Bj3EwDi2avgYpvdwrirRAGIeWl6o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
