const https = require('http');

const request = (path, method, headers = {}) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 8889,
            path: '/.netlify/functions' + path,
            method: method,
            headers: headers
        };

        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseBody);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, body: responseBody });
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
};

const run = async () => {
    // 1. Get API Key first (hardcoded from previous verify run or fetched dynamically)
    // For simplicity, I'll fetch it again.
    // In a real scenario, the user would copy it from the dashboard.
    // I'll skip fetching and assume the user's key is 'dn_f3e8f2a8c91870129a1e4deaecfcdee72f0f952bcc63e1155' 
    // based on previous verify output. If that fails, I'll need to fetch it.

    // Actually, to be safe, let's login and get the key.
    console.log("Logging in to get API Key...");

    const loginData = JSON.stringify({ email: 'final@test.com', password: '123' });
    const loginReq = https.request({
        hostname: 'localhost', port: 8889, path: '/.netlify/functions/auth-login', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': loginData.length }
    }, res => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', async () => {
            const auth = JSON.parse(body);
            if (!auth.token) { console.error("Login failed"); return; }

            // Get Dashboard Data to find API Key
            const dashReq = https.request({
                hostname: 'localhost', port: 8889, path: '/.netlify/functions/get-dashboard-data', method: 'GET',
                headers: { 'Authorization': `Bearer ${auth.token}` }
            }, dRes => {
                let dBody = '';
                dRes.on('data', c => dBody += c);
                dRes.on('end', async () => {
                    const data = JSON.parse(dBody);
                    const apiKey = data.user.apiKey;
                    console.log("Got API Key:", apiKey);

                    if (!apiKey) { console.error("No API Key found on user"); return; }

                    console.log("Simulating 5 API calls...");
                    for (let i = 0; i < 5; i++) {
                        const sim = await request('/simulate-usage', 'POST', { 'x-api-key': apiKey });
                        console.log(`Call ${i + 1}: Status ${sim.status}, Remaining: ${sim.body.remainingCredits}`);
                    }
                });
            });
            dashReq.end();
        });
    });
    loginReq.write(loginData);
    loginReq.end();
};

run();
