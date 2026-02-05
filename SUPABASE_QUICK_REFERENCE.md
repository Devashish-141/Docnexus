# Supabase Quick Reference

## Environment Variables
```env
VITE_API_URL=http://localhost:3000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your_jwt_secret_key_change_in_production
ADMIN_API_KEY=admin123
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  credits INTEGER DEFAULT 0,
  company TEXT,
  api_key TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Usage Logs Table
```sql
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT,
  cost NUMERIC(10, 2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Common Supabase Queries

### Select User by Email
```typescript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single();
```

### Insert New User
```typescript
const { data, error } = await supabase
  .from('users')
  .insert({
    email: 'user@example.com',
    password: hashedPassword,
    name: 'John Doe',
    credits: 50,
    company: 'My Company'
  })
  .select()
  .single();
```

### Update User Credits
```typescript
const { error } = await supabase
  .from('users')
  .update({ credits: newCredits })
  .eq('id', userId);
```

### Insert Usage Log
```typescript
await supabase
  .from('usage_logs')
  .insert({
    user_id: userId,
    endpoint: '/api/endpoint',
    cost: 1,
  });
```

### Get Usage Logs
```typescript
const { data, error } = await supabase
  .from('usage_logs')
  .select('*')
  .eq('user_id', userId)
  .order('timestamp', { ascending: true })
  .limit(100);
```

## API Endpoints

All endpoints have been migrated to use Supabase:

- ✅ `POST /api/auth-login` - User login
- ✅ `POST /api/auth-signup` - User registration
- ✅ `GET /api/get-dashboard-data` - Get user dashboard data
- ✅ `POST /api/generate-api-key` - Generate new API key
- ✅ `POST /api/simulate-usage` - Simulate API usage
- ✅ `POST /api/admin-update-credits` - Admin credit update
- ✅ `POST /api/contact-submit` - Contact form (no DB changes needed)

## Key Differences: MongoDB vs Supabase

| Feature | MongoDB | Supabase |
|---------|---------|----------|
| ID Field | `_id` (ObjectId) | `id` (UUID) |
| Naming | camelCase | snake_case |
| Queries | Mongoose methods | Supabase client |
| Timestamps | `createdAt` | `created_at` |
| Relations | Manual refs | Foreign keys |
| Auth | Custom JWT | Built-in + Custom |

## Field Name Mappings

| MongoDB | Supabase |
|---------|----------|
| `_id` | `id` |
| `apiKey` | `api_key` |
| `createdAt` | `created_at` |
| `userId` | `user_id` |

## Testing Checklist

- [ ] Sign up new user
- [ ] Login with credentials
- [ ] View dashboard
- [ ] Generate API key
- [ ] Test API usage with key
- [ ] Admin credit update
- [ ] Check Supabase dashboard for data
- [ ] Verify RLS policies work
- [ ] Test error handling
- [ ] Deploy to production

## Useful Supabase Dashboard Links

- **Table Editor**: View and edit data
- **SQL Editor**: Run custom queries
- **API Docs**: Auto-generated API documentation
- **Database**: Performance and query insights
- **Authentication**: User management (if using Supabase Auth)
- **Storage**: File storage management

## Common Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Linter
```bash
npm run lint
```

## Supabase Client Usage

Import the client:
```typescript
import { supabase } from './lib/supabase';
```

The client is already configured with your credentials from environment variables.

## Security Notes

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Service role policies allow API operations
- ✅ User data is protected by RLS policies
- ✅ Passwords are hashed with bcrypt
- ✅ API keys are prefixed with 'dn_' for identification
- ✅ JWT tokens are used for authentication

## Performance Tips

1. **Use Indexes**: Already created on email, api_key, user_id, and timestamp
2. **Limit Results**: Always use `.limit()` for large datasets
3. **Select Specific Fields**: Use `.select('field1, field2')` instead of `.select('*')`
4. **Use Single Queries**: Combine operations when possible
5. **Cache Results**: Implement caching for frequently accessed data

## Backup and Recovery

Supabase automatically backs up your database daily. To restore:
1. Go to Database → Backups
2. Select the backup point
3. Click "Restore"

For manual backups:
1. Use the SQL Editor to export data
2. Or use pg_dump for PostgreSQL backups

## Next Steps

Consider these enhancements:
- [ ] Implement Supabase Auth for easier user management
- [ ] Add real-time subscriptions for live updates
- [ ] Use Supabase Storage for file uploads
- [ ] Implement Edge Functions for complex operations
- [ ] Set up email notifications with Supabase
- [ ] Add social login providers
