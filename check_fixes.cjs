const https = require('https');

const candidates = [
    "salesforce", // Retrying
    "monday",     // Alternative for mondaydotcom
    "sharepoint", // Alternative for microsoftsharepoint
    "microsoftsharepoint", // Retrying
    "pabbly",     // Retrying
    "pabblyconnect", // Candidate
    "dropbox"     // Fallback if Pabbly fails
];

const checkUrl = (slug) => {
    return new Promise((resolve) => {
        const url = `https://cdn.simpleicons.org/${slug}`;
        const options = {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        };
        https.get(url, options, (res) => {
            console.log(`${slug}: ${res.statusCode}`);
            resolve();
        }).on('error', (e) => {
            console.log(`${slug}: Error ${e.message}`);
            resolve();
        });
    });
};

const run = async () => {
    console.log("Checking fixes...");
    for (const slug of candidates) {
        await checkUrl(slug);
    }
};

run();
