const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error("Missing env vars");
    process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
    console.log('Testing Supabase connection...');
    try {
        const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Connection Failed:', error.message);
            console.error('Details:', error);
        } else {
            console.log('✅ Connection Successful!');
            console.log('   Users in DB:', count);
        }
    } catch (e) {
        console.error('❌ Critical Error:', e);
    }
}

test();
