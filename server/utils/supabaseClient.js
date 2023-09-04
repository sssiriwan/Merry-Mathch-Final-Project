import dotenv from "dotenv"
import * as pg from "pg"

dotenv.config();
const { Pool } = pg.default;

const pool = new Pool({
    connectionString: `postgresql://postgres:${process.env.SUPABASE_PASSWORD}@db.pauqbkgvjpahoowveuka.supabase.co:5432/postgres`
});

export { pool }

// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_ANON_KEY
// export const supabase = createClient(supabaseUrl, supabaseKey)
