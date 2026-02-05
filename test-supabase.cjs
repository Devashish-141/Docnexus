// Test Supabase Connection
// Run this with: node test-supabase.cjs

require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

console.log('\n🔍 Checking Supabase Configuration...\n');

if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') {
    console.log('❌ SUPABASE_URL is not set or still has placeholder value');
    console.log('   Current value:', SUPABASE_URL);
    console.log('\n📝 Action Required:');
    console.log('   1. Go to https://supabase.com');
    console.log('   2. Create a project or select existing one');
    console.log('   3. Go to Settings → API');
    console.log('   4. Copy the Project URL');
    console.log('   5. Update .env file with: SUPABASE_URL=your-actual-url\n');
} else {
    console.log('✅ SUPABASE_URL is set');
    console.log('   Value:', SUPABASE_URL);
}

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.log('\n❌ SUPABASE_ANON_KEY is not set or still has placeholder value');
    console.log('   Current value:', SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.substring(0, 20) + '...' : 'undefined');
    console.log('\n📝 Action Required:');
    console.log('   1. Go to https://supabase.com');
    console.log('   2. Go to Settings → API');
    console.log('   3. Copy the "anon public" key');
    console.log('   4. Update .env file with: SUPABASE_ANON_KEY=your-actual-key\n');
} else {
    console.log('\n✅ SUPABASE_ANON_KEY is set');
    console.log('   Value:', SUPABASE_ANON_KEY.substring(0, 30) + '...');
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'your_jwt_secret_key_change_in_production') {
    console.log('\n⚠️  JWT_SECRET is using default value');
    console.log('   Consider changing it for production');
} else {
    console.log('\n✅ JWT_SECRET is set');
}

console.log('\n' + '='.repeat(60));

if (SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' &&
    SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    console.log('\n✅ Configuration looks good!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Make sure you ran the SQL schema in Supabase');
    console.log('   2. Run: netlify dev');
    console.log('   3. Open: http://localhost:8888');
    console.log('   4. Try signing up with a test account\n');
} else {
    console.log('\n❌ Configuration incomplete');
    console.log('\n📋 Next Steps:');
    console.log('   1. Update .env with your Supabase credentials');
    console.log('   2. Run this script again: node test-supabase.cjs');
    console.log('   3. Then run: netlify dev\n');
}
