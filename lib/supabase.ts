import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://shzezsrxqxtosblkmvsz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoemV6c3J4cXh0b3NibGttdnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTcwMTgsImV4cCI6MjA4NjgzMzAxOH0.i4LaQMK34eJMSfKryLplpwJcQrzN7JsbMZbGRTu-268";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
