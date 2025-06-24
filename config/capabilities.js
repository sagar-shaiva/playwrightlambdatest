module.exports = [
    {
        "browserName": "MicrosoftEdge",
        "browserVersion": "134.0",
        "LT:Options": {
            "video": true,
            "platform": "Windows 11",
            "console": true,
            'build': 'Playwright Test With Lambdatest windows',
            'name': 'Playwright Test With Lambdatest on Windows 11 - Microsft',
            'user': process.env.LT_USERNAME,
            'accessKey': process.env.LT_ACCESS_KEY
        }
    },
    
    {
        "browserName": "Chrome",
        "browserVersion": "125.0",
        "LT:Options": {
            "video": true,
            "platform": "macOS Sonoma",
            "console": true,
            "build": "Playwright Test With Lambdatest mac os",
            "name": "Playwright Test With Lambdatest on Mac OS - Chrome",
            "user": process.env.LT_USERNAME,
            "accessKey": process.env.LT_ACCESS_KEY
        }
    }
];
