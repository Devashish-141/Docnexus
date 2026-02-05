const https = require('http');

const request = (path, method, body, headers = {}) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'localhost',
            port: 8888,
            path: '/.netlify/functions' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data ? Buffer.byteLength(data) : 0,
                ...headers
            }
        };

        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                try {
                    // Try parsing JSON, or return text if fails
                    const parsed = JSON.parse(responseBody);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    console.log("Raw Response:", responseBody);
                    resolve({ status: res.statusCode, body: responseBody });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (data) req.write(data);
        req.end();
    });
};

const run = async () => {
    try {
        console.log('--- 1. Testing Signup/Login for final@test.com ---');
        const signupData = { email: 'final@test.com', password: '123', name: 'VP Final', company: 'Vision Ops' };
        let authRes = await request('/auth-signup', 'POST', signupData);

        if (authRes.status === 400 && authRes.body.error === 'User already exists') {
            console.log('User exists, logging in...');
            authRes = await request('/auth-login', 'POST', { email: 'final@test.com', password: '123' });
        }

        if (authRes.status !== 200 && authRes.status !== 201) {
            throw new Error(`Auth failed: ${JSON.stringify(authRes)}`);
        }

        const token = authRes.body.token;
        console.log('Auth Successful. Token obtained.');

        console.log('\n--- 2. Testing Get Dashboard Data ---');
        const dashRes = await request('/get-dashboard-data', 'GET', null, { 'Authorization': `Bearer ${token}` });
        console.log('Dashboard Data:', JSON.stringify(dashRes.body.user, null, 2));

        console.log('\n--- 3. Testing Generate API Key ---');
        // Only generate if not exists
        if (!dashRes.body.user.apiKey) {
            const keyRes = await request('/generate-api-key', 'POST', null, { 'Authorization': `Bearer ${token}` });
            console.log('Generated Key:', keyRes.body);
        } else {
            console.log('API Key already exists:', dashRes.body.user.apiKey);
        }

        console.log('\n--- 4. Testing Admin Update Credits ---');
        const adminRes = await request('/admin-update-credits', 'POST',
            { email: 'final@test.com', credits: 100 },
            { 'x-admin-key': 'admin_secret_key_12345' }
        );
        console.log('Admin Update Result:', adminRes.body);

        console.log('\n--- 5. Verification Complete ---');

    } catch (err) {
        console.error('Verification Failed:', err);
    }
};

run();
