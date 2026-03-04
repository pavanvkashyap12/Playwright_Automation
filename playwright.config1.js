// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 2, // Retry failed tests up to 2 times
  //workers: 2, // Limit the number of workers to 2 for parallel test execution
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        viewport:{ width: 720, height: 720},
        ignoreHTTPSErrors: true,
        permissions: ['geolocation','camera'], // Grant geolocation and camera permissions to the browser context
        video: 'retain-on-failure', // Record video only for failed tests
        trace: 'retain-on-failure' // Collect trace on each test step only for failed tests
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 12'] // Use predefined device emulation for Desktop Safari
      }
    }
  ]
});

//Command :  npx playwright test tests/24.ClientAppsPO.spec.js --config=playwright.config1.js --project=chromium 


// We can run multiple config files in same project by using --config parameter in command line like npx playwright test --config=playwright.config1.js
// npx playwright test --config=playwright.config.js  this will run tests with config in playwright.config.js file and npx playwright test --config=playwright.config1.js this will run tests with config in playwright.config1.js file
// if no config file is specified then it will run with default config file which is playwright.config.js file, so we can have multiple config files in same project and run tests with different config files as per our requirement.
// but we cannot go on keeping multiple config files for each browser etc.
// we have projects which takes an array
// now we have 2 projects one for chromium and one for firefox, so we can run tests in both browsers with same config file and we can also run tests in specific browser by using --project parameter in command line like npx playwright test --project=chromium this will run tests in chromium browser and npx playwright test --project=firefox this will run tests in firefox browser.
// if we do not specify it will run in all browsers specified in projects array. ie 2times one for chromium and one for firefox. so we can run tests in multiple browsers with same config file and we can also run tests in specific browser by using --project parameter in command line.

// VIEW PORT
// used to override the default viewport size for the browser context. By default, Playwright sets the viewport size to 1280x720 pixels. You can change this to simulate different screen sizes and test responsive designs. For example, you can set it to 1920x1080 for desktop testing or 375x667 for mobile testing. This is useful for ensuring that your application looks and functions correctly across various devices and screen sizes.
// viewport: { width: 1920, height: 1080 } // Set viewport size to 1920x1080 pixels for desktop testing
// we can also specify device emulation in projects array like this
// {
//   name: 'chromium',
//   use: { 
//     ...devices['Desktop Chrome'], // Use predefined device emulation for Desktop Chrome
// do not use devices and viewport together because it will override the viewport specified in devices and it will take viewport specified in use object, so if you want to use devices then do not specify viewport in use object and if you want to specify viewport then do not use devices in use object.
// when you devices does not work then you can specify viewport and userAgent in use object like this
// {
//   name: 'chromium',
//   use: {
//     browserName: 'chromium',
//     headless: false,
//     screenshot: 'on',
//     viewport: { width: 1920, height: 1080 }, // Set viewport size to 1920x1080 pixels for desktop testing
//     userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // Set user agent string for desktop Chrome
//   }
// }


// SSL CERTIFICATE ERRORS
// If your application is running on a local development server with a self-signed SSL certificate, you may encounter SSL certificate errors when running tests in headless mode. To bypass these errors, you can set the ignoreHTTPSErrors option to true in the use object of your configuration file. This will allow Playwright to ignore SSL certificate errors and continue with the test execution. For example:
// use: {
//   browserName: 'chromium',
//   headless: true,
//   ignoreHTTPSErrors: true // Ignore SSL certificate errors
// }
// This is particularly useful when testing applications that are not yet deployed to a production environment and are using self-signed certificates for development purposes. By ignoring SSL certificate errors, you can ensure that your tests run smoothly without being blocked by security warnings. However, it is important to note that this should only be used in a development environment and not in production, as it can pose security risks.

// we can also allow permissions like location, camera, microphone etc. in use object like this
// use: {
//   browserName: 'chromium',
//   headless: true,
//   permissions: ['geolocation', 'camera'] // Grant geolocation and camera permissions to the browser context
// }
// This is useful for testing features that require specific permissions, such as geolocation-based services or applications that access the user's camera. By granting these permissions in the test configuration, you can ensure that your tests accurately simulate real user interactions and behaviors.


// SCREENSHOTS,VIDEOS AND TRACES and SSL CERTIFICATE ERRORS
// Playwright provides built-in support for capturing screenshots, videos, and traces during test execution. You can configure these options in the use object of your configuration file. For example:
// use: {
//   browserName: 'chromium',
//   headless: true,
    // screenshot: 'on', // Capture screenshot on each test step
    // trace: 'retain-on-failure', // Collect trace on each test step only for failed tests
    // video: 'retain-on-failure' // Record video only for failed tests
// }

// video : on - Record video for each test, regardless of the test outcome.
// off - Do not record video for any tests.
// retain-on-failure - Record video for all test but retain only for tests that fail. This is useful for debugging and analyzing test failures without consuming storage space for successful test runs.
// on-first-retry - Record video only for the first retry of a failed test. This can help you identify issues that may be resolved on a retry without recording videos for all retries.
// This configuration will capture a screenshot on each test step, retain traces only for failed tests, and record videos only for failed tests. This is particularly useful for debugging and analyzing test failures, as it provides visual evidence of what went wrong during the test execution. By retaining traces and videos only for failed tests, you can save storage space while still having access to valuable information for troubleshooting issues.


// Screenshot and trace are different, screenshot is a static image of the browser at a specific point in time, while trace is a detailed log of all the actions performed by the browser during the test execution. Trace includes information about network requests, console logs, and other browser events, which can be extremely helpful for debugging and analyzing test failures. By configuring these options in your Playwright configuration file, you can ensure that you have the necessary information to diagnose issues effectively when tests fail.
// TRACE : on - Collect trace for each test, regardless of the test outcome.
// off - Do not collect trace for any tests.
// retain-on-failure - Collect trace for all test but retain only for tests that fail. This is useful for debugging and analyzing test failures without consuming storage space for successful test runs.
// on-first-retry - Collect trace only for the first retry of a failed test. This can help you identify issues that may be resolved on a retry without collecting traces for all retries.


// RETRIES - in 100 10-15 fails but if we run it will pass
// Sometimes tests can be flaky due to various reasons such as network issues, timing problems, or other transient factors. To mitigate this, Playwright allows you to configure retries in your test configuration file. By setting the retries option, you can specify the number of times a failed test should be retried before being marked as a failure. For example:
// retries: 2 // Retry failed tests up to 2 times
// This means that if a test fails, it will be retried up to 2 additional times before being considered a final failure. This can help improve the stability of your test suite by allowing for transient issues to be resolved on subsequent attempts, while still providing a clear indication of persistent failures that need attention.
// retires is applied on all projects hence keep it outside projects array, if you want to apply it on specific project then you can specify it in use object of that project like this
// {
//   name: 'chromium',  
//   use: {
//     retries: 2 // Retry failed tests up to 2 times for this specific project
//   }
// }
// in report we can see a triangle mark on test which is retried and if we click on it we can see how many times it is retried and what is the result of each retry. This is useful for analyzing flaky tests and understanding the stability of your test suite. By configuring retries, you can improve the reliability of your tests while still maintaining visibility into any issues that may arise.
// it will be marked as flaky if it is passed in retry and failed in first attempt, if it is passed in first attempt then it will be marked as passed and if it is failed in all attempts then it will be marked as failed. This helps you identify tests that may be flaky and require further investigation to ensure the stability of your test suite.


// TESTS IN PARALLEL AND IN SERIAL
// By default, Playwright runs tests in parallel to speed up test execution. However, there may be cases where you want to run tests in a specific order or ensure that certain tests do not run concurrently. To achieve this, you can use the test.describe.serial method to group tests that should be run in serial. For example:
// test.describe.serial('Serial Tests', () => {
//   test('Test 1', async ({ page }) => {
//     // Test code for Test 1
//   });
//   test('Test 2', async ({ page }) => {
//     // Test code for Test 2
//   });
// });
// In this example, the tests within the describe block will be executed in the order they are defined, ensuring that Test 1 runs before Test 2. This is particularly useful when you have tests that depend on each other or when you want to ensure that certain tests do not interfere with each other by running concurrently. By using test.describe.serial, you can control the execution flow of your tests while still benefiting from Playwright's powerful testing capabilities.


// in a spec file if 2 tests are there it will run serial by default 
// but if we run whole test folder it will run parallel by default
// Ex when we do npx playwright test it will run all tests in parallel 
// ie running 15 tests using 5 workers, ie 5 browser instances will be launched and 3 tests will be assigned to each browser instance, so all 15 tests will be executed in parallel using 5 workers. This can significantly reduce the overall test execution time, especially for larger test suites. However, if you have tests that need to run in a specific order or should not run concurrently, you can use the test.describe.serial method to group those tests together and ensure they run in serial instead of parallel.
// by default 5 workers, Playwright uses a number of workers equal to the number of CPU cores available on your machine to run tests in parallel. You can also configure the number of workers using the --workers command-line option or by setting the workers property in your configuration file. For example, if you want to limit the number of workers to 2, you can set it like this:
// workers: 2 in global// Limit the number of workers to 2 for parallel test execution
// This can be useful if you want to reduce the load on your machine or if you have tests that are resource-intensive and may not perform well when run in parallel with a large number of workers. By configuring the number of workers, you can optimize the test execution based on your specific needs and the capabilities of your testing environment.

// To run tests parallel in a spec file we can use test.describe.parallel method like this
// test.describe.parallel('Parallel Tests', () => {
//   test('Test 1', async ({ page }) => {
//     // Test code for Test 1
//   });
//   test('Test 2', async ({ page }) => {
//     // Test code for Test 2
//   });
// });
// In this example, the tests within the describe block will be executed in parallel, allowing Test 1 and Test 2 to run concurrently. This can help speed up test execution when you have independent tests that do not rely on each other. By using test.describe.parallel, you can take advantage of Playwright's ability to run tests in parallel while still organizing your tests in a clear and structured manner.
// rahul shetty
// test.describe.configure({mode: 'parallel'}); this looks like a single line stmnt, this is same as test.describe.parallel, it will run all tests in parallel within that describe block. This is a convenient way to specify that all tests in a particular group should be executed concurrently without having to wrap each test in a separate test.describe.parallel block. By configuring the describe block with mode: 'parallel', you can ensure that all tests within that block are run in parallel, which can help reduce the overall test execution time for independent tests.
// test.describe.configure({mode: 'serial'}); this will run all tests in serial within that describe block, it is same as test.describe.serial, it will run all tests in serial within that describe block. This is useful when you have tests that depend on each other or when you want to ensure that certain tests do not interfere with each other by running concurrently. By configuring the describe block with mode: 'serial', you can control the execution flow of your tests and ensure that they run in a specific order when necessary.
// By default tests in a spec file will run in serial, but when you give serial if 1st test fails then all other tests will be skipped.

// Race Condition : when 2 tests are running in parallel and both are trying to access the same resource like database, file etc.

// TAGGING TESTS
// Playwright allows you to tag tests with custom labels to organize and filter them based on specific criteria. You can use the test.skip and test.only methods to control which tests are executed based on their tags. For example:
// test('Test 1', async ({ page }) => {
  // Test code for Test 1
// }).tag('smoke');
// test('Test 2', async ({ page }) => { 
  // Test code for Test 2
// }).tag('regression');
// In this example, Test 1 is tagged as 'smoke' and Test 2 is tagged as 'regression'. You can then use the --grep command-line option to run tests with specific tags. For instance, npx playwright test --grep @smoke will run only the tests tagged with 'smoke', while npx playwright test --grep @regression will run only the tests tagged with 'regression'. This allows you to easily organize and execute subsets of your test suite based on different testing criteria or priorities. By using tags, you can improve the manageability and flexibility of your test execution process.
// this also works with test.describe block like this
// test.describe('Smoke Tests', () => {
//   test('Test 1', async ({ page }) => {   
    // Test code for Test 1
//   }).tag('smoke');
//   test('Test 2', async ({ page }) => {
    // Test code for Test 2
//   }).tag('smoke');
// });
// In this example, both Test 1 and Test 2 are tagged as 'smoke' within the describe block. You can then run all tests tagged with 'smoke' using the command npx playwright test --grep @smoke, which will execute both tests in that describe block. This is a convenient way to group related tests together and run them based on their tags, allowing for more efficient test execution and organization. By tagging tests within a describe block, you can easily manage and filter your test suite based on specific testing criteria or priorities.

// Rahul Shetty
// test('@Web Test 1', async ({ page }) => { //@Web is a tag for this test, we can use any name for tag like @smoke, @regression etc. and we can run this test by using npx playwright test --grep @Web this will run only this test, if we do not specify --grep then it will run all tests in that spec file. This is useful for running specific tests based on their tags, allowing you to focus on certain areas of your application or specific types of tests without having to run the entire test suite. By using tags, you can improve the efficiency and organization of your test execution process.
  // Test code for Test 1
// })



// REPORTING
// Playwright provides built-in support for generating test reports in various formats, including HTML, JSON, and JUnit. You can configure the reporter in your Playwright configuration file to specify the desired format and output location for your test reports. For example:
// reporter: 'html' // Set HTML reporter to generate test report after test execution
// This configuration will generate an HTML report after each test run, providing a detailed overview of the test results, including which tests passed, failed, or were skipped, along with any relevant logs and screenshots. By configuring the reporter in your Playwright configuration file, you can easily access and analyze the results of your test runs in a user-friendly format. Additionally, you can specify the output folder for the report using options like reporter: [['html', { outputFolder: 'my-html-report' }]], which will generate the HTML report in the specified folder after test execution. This allows you to organize and manage your test reports effectively based on your project requirements.
// HTML report we can just put in config.js file and it will generate report after test execution, we can also specify the output folder for report like this
// reporter: [['html', { outputFolder: 'my-html-report' }]]
// This configuration will generate an HTML report in the specified output folder after test execution. The report will provide a detailed overview of the test results, including which tests passed, failed, or were skipped, along with any relevant logs and screenshots. By configuring the reporter in your Playwright configuration file, you can easily access and analyze the results of your test runs in a user-friendly format.

// ALLURE Report is a popular third-party reporting tool that provides advanced features for test reporting and analysis. To use Allure Report with Playwright, you need to install the allure-playwright package and configure it in your Playwright configuration file. For example:
// npm install allure-playwright --save-dev or npm install -D allure-playwright
// Then in your Playwright configuration file, you can set up the Allure reporter like this:
// reporter: [['allure-playwright', { outputFolder: 'allure-results' }]]
// This configuration will generate Allure reports in the specified output folder after test execution. Allure Report provides a rich set of features for visualizing test results, including interactive dashboards, detailed test case information, and support for attachments such as screenshots and logs. By integrating Allure Report with Playwright, you can enhance your test reporting capabilities and gain deeper insights into your test runs, making it easier to identify issues and track the overall health of your test suite.
// By default it will give report in HTML
// if we want to generate report in allure we have to specify it, before that we have to generate line report 
// because it generates reprt in plain text and then allure will take this text format reporting and then generate its own reporting

// npx playwright test --repoter=line,allure-playwright --output=allure-results
// This command will run the tests and generate a line report in plain text format, which is then processed by the allure-playwright reporter to create the Allure report in the specified output folder. By using this approach, you can leverage the powerful features of Allure Report while still utilizing Playwright's built-in reporting capabilities to capture detailed information about your test runs. This allows you to create comprehensive and visually appealing reports that can help you analyze and understand the results of your tests more effectively.
// After test execution is completed we need to generate allure report using command npx allure generate allure-results --clean -o allure-report this will take the results from allure-results folder and generate report in allure-report folder, we can specify any name for output folder, this will open the report in browser and we can see the details of test execution in that report. This is a powerful way to visualize and analyze your test results, making it easier to identify issues and track the overall health of your test suite. By generating Allure reports, you can gain deeper insights into your test runs and improve the efficiency of your testing process.
// rahul shetty-> npx allur generate ./allure-results(floder where line report is generated) --clean -o ./allure-report (folder where allure report will be generated) this will generate allure report in allure-report folder and open it in browser, we can see the details of test execution in that report. This is a powerful way to visualize and analyze your test results, making it easier to identify issues and track the overall health of your test suite. By generating Allure reports, you can gain deeper insights into your test runs and improve the efficiency of your testing process.
// clean -> to delte any previous report in allure-report folder before generating new report, this is useful to avoid confusion between old and new reports and to ensure that you are analyzing the most recent test results. By using the --clean option, you can maintain a clear and organized reporting structure for your test runs, allowing you to focus on the latest results without being distracted by outdated information. This helps you make informed decisions based on the most current data from your test executions.
// now to open the report -> allure open allure-report this will open the report in browser and we can see the details of test execution in that report. This is a powerful way to visualize and analyze your test results, making it easier to identify issues and track the overall health of your test suite. By generating and opening Allure reports, you can gain deeper insights into your test runs and improve the efficiency of your testing process. This allows you to quickly understand the outcomes of your tests and take appropriate actions based on the results.

// COMMANDS
// npx playwright test tests/19.visualtesting.spec.js --repoter=line,allure-playwright --output=allure-results bydefault it will create allure-results
// npx allure generate ./allure-results --clean you can see new folder allure-report is created and it will open in browser, you can see the details of test execution in that report. This is a powerful way to visualize and analyze your test results, making it easier to identify issues and track the overall health of your test suite. By generating and opening Allure reports, you can gain deeper insights into your test runs and improve the efficiency of your testing process. This allows you to quickly understand the outcomes of your tests and take appropriate actions based on the results.
// npx allure open ./allure-report this will open the report in browser and we can see the details of test execution in that report. This is a powerful way to visualize and analyze your test results, making it easier to identify issues and track the overall health of your test suite. By generating and opening Allure reports, you can gain deeper insights into your test runs and improve the efficiency of your testing process. This allows you to quickly understand the outcomes of your tests and take appropriate actions based on the results.

//npx allure generate ./allure-results -o ./allure-report use this as 2nd command