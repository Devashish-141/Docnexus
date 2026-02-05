const https = require('https');

const slugs = [
    "salesforce", "zapier", "n8n", "make", "google", "pabbly",
    "airtable", "microsoftsharepoint", "shopify", "slack", "notion",
    "hubspot", "mondaydotcom", "jira", "zendesk", "intercom"
];

const checkUrl = (slug) => {
    return new Promise((resolve) => {
        const url = `https://cdn.simpleicons.org/${slug}`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                // console.log(`To [OK] ${slug}`);
                resolve({ slug, status: 'OK' });
            } else {
                console.log(`[FAIL] ${slug}: ${res.statusCode}`);
                resolve({ slug, status: 'FAIL' });
            }
        }).on('error', (e) => {
            console.log(`[ERR] ${slug}: ${e.message}`);
            resolve({ slug, status: 'ERR' });
        });
    });
};

const run = async () => {
    console.log("Checking icons...");
    const promises = slugs.map(checkUrl);
    await Promise.all(promises);
    console.log("Done.");
};

run();
