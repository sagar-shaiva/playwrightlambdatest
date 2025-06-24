# Playwright LambdaTest Project

This project is designed to run automated browser tests using Playwright along with LambdaTest capabilities.

## Description

The project leverages Playwright for testing and uses [LambdaTest](https://www.lambdatest.com/) to run tests on various browsers. It includes test scenarios such as login and form interactions on multiple sites.

## Requirements

- Node.js (v14 or above)
- npm

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://your-repo-url.git
   ```
2. Navigate to the project directory:
   ```sh
   cd d:\playwrightlamda
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running Tests

To execute the tests, run:
```sh
npx playwright test
```

## Project Structure

```
d:\playwrightlamda
│
├── config
│   └── capabilities.js    // Browser capabilities configuration for LambdaTest
├── playwright-report      // HTML report generated after test runs
├── tests
│   └── login.spec.js      // Automated test scenarios
├── utils
│   ├── setup.js           // Setup functions to connect to browsers
│   └── teardown.js        // Cleanup functions after tests
├── .gitignore             // Files and directories to ignore
├── .gitpod.yml            // Gitpod workspace configuration
├── package.json           // Project dependencies and scripts
└── README.md              // This file
```

## Contributing

Contributions are welcome! Fork the repository, create a branch for your feature, and submit a pull request.

## License

This project is licensed under the MIT License.