import mongoose, { Schema } from 'mongoose';

// User Schema (Synced with n8n/Auth)
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    credits: { type: Number, default: 0 },
    company: String,
    apiKey: { type: String, unique: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
}, { bufferCommands: false });

// Create model if not exists
export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Usage Log Schema
const UsageLogSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    endpoint: String,
    cost: Number,
    timestamp: { type: Date, default: Date.now }
});

export const UsageLog = mongoose.models.UsageLog || mongoose.model('UsageLog', UsageLogSchema);
