import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://shzezsrxqxtosblkmvsz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_O94N5xjWLYZ7GNHVn1oWkA_nw4dPBG0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
