const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    company: String,
    credits: { type: Number, default: 1000 },
    apiKeys: [{ type: String }],
    usageHistory: [{ date: Date, amount: Number }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');

        const users = await User.find({}).select('email name company credits createdAt');

        console.log(`Total users found: ${users.length}\n`);

        if (users.length === 0) {
            console.log('⚠️  No users found in database!');
            console.log('Please use the REGISTER tab to create a new account first.\n');
        } else {
            console.log('Existing users:');
            users.forEach((user, index) => {
                console.log(`${index + 1}. Email: ${user.email}`);
                console.log(`   Name: ${user.name || 'N/A'}`);
                console.log(`   Company: ${user.company || 'N/A'}`);
                console.log(`   Credits: ${user.credits}`);
                console.log(`   Created: ${user.createdAt}`);
                console.log('');
            });
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkUsers();
