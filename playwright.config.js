// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', // Specify the directory where the test files are located
  timeout: 40 * 1000, // Set global timeout for each test to 40 seconds, this for locators and components
  expect: {
    timeout: 40*1000 // Set global expect timeout to 40 seconds for assertions
  },
  reporter:'html', // Set HTML reporter to generate test report after test execution
  use: {
    browserName: 'chromium', // run in Chrome browser cange to firefox it will run in firefox, this browserName is catcing in test function fixture {browser}
    headless: false, // Run tests in headless mode. Set to false to see the browser UI.
    screenshot: 'on', // Capture screenshot on each test step
    trace: 'retain-on-failure', // on,off are other parameters Collect trace on each test step only for failed tests
  }
});

// This is like same as above code using commonjs or ES Module syntax
// const config = ({
//   testDir: './tests', // Specify the directory where the test files are located
//   timeout: 40 * 1000, // Set global timeout for each test to 40 seconds, this for locators and components
//   expect: {
//     timeout: 40*1000 // Set global expect timeout to 40 seconds for assertions
//   },
//   reporter:'html', // Set HTML reporter to generate test report after test execution
//   use: {
//     browserName: 'chromium', // Set default browser to Chromium
//   }
// });
// export default config;ES Module OR module.exports = config; in commonjs 
// So this config JS Object is holding all configuration and after export it is available for whole project
// in other tools we have to write code to get logs in playwright no need