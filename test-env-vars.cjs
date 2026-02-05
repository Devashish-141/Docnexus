// Test script to verify environment variables are properly configured
// Run this locally with: node test-env-vars.cjs

require('dotenv').config();

console.log('🔍 Checking Environment Variables...\n');

const requiredVars = [
    { name: 'SUPABASE_URL', value: process.env.SUPABASE_URL },
    { name: 'SUPABASE_ANON_KEY', value: process.env.SUPABASE_ANON_KEY },
    { name: 'JWT_SECRET', value: process.env.JWT_SECRET }
];

let allPresent = true;

requiredVars.forEach(({ name, value }) => {
    if (value && value.trim() !== '') {
        console.log(`✅ ${name}: Set (length: ${value.length} characters)`);

        // Additional validation
        if (name === 'SUPABASE_URL' && !value.includes('supabase.co')) {
            console.log(`   ⚠️  Warning: SUPABASE_URL doesn't look like a valid Supabase URL`);
        }
        if (name === 'JWT_SECRET' && value.length < 32) {
            console.log(`   ⚠️  Warning: JWT_SECRET should be at least 32 characters long for security`);
        }
    } else {
        console.log(`❌ ${name}: NOT SET`);
        allPresent = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
    console.log('✅ All required environment variables are configured!');
    console.log('\n💡 Next Steps:');
    console.log('   1. Make sure these same variables are set in Netlify');
    console.log('   2. Deploy your site');
    console.log('   3. Test the authentication');
} else {
    console.log('❌ Some environment variables are missing!');
    console.log('\n💡 To fix:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Fill in the missing values');
    console.log('   3. For Netlify: Add variables in Site Settings > Environment variables');
    console.log('\n📖 See NETLIFY_SETUP.md for detailed instructions');
}
