///Importance of Playwright Test Annotations and async await understanding
/// First import annotation from Playwright module, all playwright modules are in node_modules folder
/// These are like jars in Java

// import {test} from '@playwright/test'; //ES Module (import syntax)
// OR const {test} = require('@playwright/test'); CommonJS (Node.js – require)
// {test} -> These tests executed in Plawright environment that launches browser and provides a fresh page to each test
// When to use which?
// Use require if:
// Your project uses CommonJS
// No "type": "module" in package.json
// Use import if:
// "type": "module" is present in package.json
// Or you’re using TypeScript (recommended for Playwright)

//import {test} from '@playwright/test';

// test(title,testFunction); testAnnotation syntax, testAnnotation will not work without importing it from Playwright module
// JS is ansynchronous in nature, so to handle async operations we use async await keywords
// async -> to declare a function as asynchronous
// await -> to wait for an asynchronous operation to complete
// In Playwright most of the operations are asynchronous in nature, so we need to use async await keywords
// Example: Launching browser, navigating to a page, clicking on an element, etc are all asynchronous operations
// So we need to use async await keywords to handle these operations
// So use await keyword before any Playwright operation that returns a promise
// Example: await page.goto('https://example.com'); -> Here goto() method is asynchronous and returns a promise, so we use await keyword before it
// And add async keyword before the function declaration to make it asynchronous


// test('First Playwright Test',async function(){
// here function does not have a name, it is an anonymous function.Instead of function keyword we can also use arrow function syntax
// })

// test('First Playwright Test', async () => {
//     // Test code goes here
//     console.log("This is my first Playwright Test");
// });

// There is a fixture called browser that is available in Playwright test environment that is globally available to each test.
// This comes by default when we use test annotation from Playwright module.
// Fixture -> A fixed state of a set of objects used as a baseline for running tests
// In Playwright test environment, browser fixture is used to launch a browser instance
// Similarly there are other fixtures like page, context, etc.
// page fixture is used to create a new page in the browser
// context fixture is used to create a new browser context
// Each test gets a fresh browser, context, and page instance to ensure test isolation and reliability
// So we can use these fixtures in our tests by adding them as parameters to the test function

// Directly using browser fixture to launch a browser instance inside the test will not work because each test gets its own isolated browser instance
// So we need to use the browser fixture provided by Playwright test environment 
// No need declare browser as a variable at top or inside the test as local variable because test function will not recongnised it.Hence send it as parameter to the test function and then that will be available inside the test function. 
// Since it is a playwright fixture it will be automatically handled by Playwright test environment
// and syntax is {browser} -> object destructuring in JavaScript, simply browser is considered as String parameter 

// Now we have to create a context. A context is like an incognito window in a browser
// Each context has its own cookies, cache, and other settings like saved settings , plugins, bookmarks etc
// So tests running in different contexts will not interfere with each other
// Hence context is created from browser instance
// Similarly page is created from context
// Each page represents a single tab in the browser
// So we need to create a new context for each test to ensure test isolation
// Similarly we need to create a new page for each test
// So the complete flow is: browser -> context -> page

// test('First Playwright Test', async ({browser}) => {
//     // Create a new browser context
//     const context = await browser.newContext(); // inside context we can set browser settings like viewport size, user agent,cookies,proxy etc.
//     // browser.newContext(); -> returns a promise, so we use await keyword before it - Creates a new incognito browser context. It will not share cookies/cache with other browser contexts.

//     // Create a new page in the context
//     const page = await context.newPage();
//     // context.newPage(); -> returns a promise, so we use await keyword before it - Creates a new page (tab) in the browser context.
//     // On this page we can perform various operations like navigating to a URL, clicking on elements, filling forms, etc.

//     // Navigate to a webpage
//     await page.goto('https://example.com');
//     // page.goto(url); -> returns a promise, so we use await keyword before it - Navigates the page to the specified URL.

//     // Print the title of the page
//     const title = await page.title();
//     console.log("Page Title:", title);
    
//     // Close the context (this will also close the page)
//     await context.close();
// });

// To run this test use the command: npx playwright test tests/UIBasicstest.spec.js
// Make sure you have Playwright installed and set up in your project
// You can also run all tests in the project by simply using: npx playwright test
// Playwright will automatically find all test files and execute them   


// Suppose we do not have any parameters in context we can just pass {page} fixture directly to the test function
// and then we can directly use page fixture to perform operations.
// Playwright test environment will automatically create a new context and page for each test
// This is a simplified way to write tests when we do not need to customize the context
// Example:

// test('Second Playwright Test', async ({page}) => {
//     // Navigate to a webpage
//     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

//     // Print the title of the page
//     const title = await page.title();
//     console.log("Page Title:", title);
// });


// PLAYWRIGHT CONFIGURATION EXPLANATION
// Now we have to configure Playwright to run tests.
// This is done in playwright.config.js file which is like heart of Playwright test framework
// Here we can set various configurations like which browser to run, browser settings, test retries, timeouts, reporters, etc.
// This configuration will be applied to all tests in the project

//testDir: './tests', // Specify the directory where the test files are located
// Timeout for each test by default is 30 seconds(30000 ms) , we can change it here globally for all tests
// Expect timeout is the time Playwright will wait for an element to appear before throwing an error is 5 seconds(5000 ms) by default, we can change it here globally for all tests
// timeout: 40*1000, // Set global timeout for each test to 40 seconds


// expect: {
//     timeout: 10000 // Set global expect timeout to 10 seconds
// }, for assertions
// We can also set different projects to run tests in different browsers like Chromium, Firefox, Webkit
// use: {
//     browserName: 'chromium', // Set default browser to Chromium
//     headless: false, // Run tests in headed mode for visual verification
//     viewport: { width: 1280, height: 720 }, // Set default viewport size
//     ignoreHTTPSErrors: true, // Ignore HTTPS errors
//     video: 'on-first-retry', // Record video only on first retry of a failed test
// },
// We can also set retries for tests in case of failures
// retries: 2, // Retry failed tests up to 2 times

// We can also set different devices to emulate mobile browsers
// projects: [
//     {
//         name: 'Mobile Chrome',
//         use: { ...devices['Pixel 5'] },
//     },
//     {
//         name: 'Mobile Safari',
//         use: { ...devices['iPhone 12'] },
//     },
// ],

// We can also set test reporters to get test results in different formats
// reporters: [['html', { open: 'never' }], ['json', { outputFile: 'test-results.json' }]],
// We can also set reporters to generate test reports in different formats like HTML, JSON, JUnit, etc.
// We can also set global setup and teardown scripts to run before and after all tests
// There are many other configurations available in Playwright, we can refer to the official documentation for more details


// By Defaulrt Playwright uses CommonJS module system
// By Default Playwright runs in headless mode
// Headless mode -> Browser runs in background without UI
// Headed mode -> Browser runs with UI, we can see the browser actions
// We can change this behavior in playwright.config.js file or directly in the test using use annotation
// Example: use: { headless: false } -> This will run the tests in headed mode

// COMMANDS TO RUN PLAYWRIGHT TESTS
// To run all tests in the project: npx playwright test
// To run a specific test file: npx playwright test tests/UIBasicstest.spec.js
// To run a specific test in a file: npx playwright test tests/UIBasicstest.spec.js -g "Test Name"
// To run tests in headed mode: npx playwright test --headed
// To run tests in a specific browser: npx playwright test --project=chromium
// To generate HTML report after test execution: npx playwright show-report

// Tests in spec file run sequentially by default
// test.only -> to run a specific test and ignore others
// test.skip -> to skip a specific test
// test.describe -> to group related tests together
// test.beforeEach -> to run a function before each test in a describe block
// test.afterEach -> to run a function after each test in a describe block
// These annotations help in organizing and managing tests effectively


// npx playwright test -> headless mode Running 4 tests using 2 workers
// npx playwright test --headed -> headed mode Running 4 tests using 2 workers
// npx playwright test --workers=1 -> to run tests sequentially using 1 worker
// npx playwright test tests/UIBasicstest.spec.js -> to run specific test file
// npx playwright show-report -> to show HTML report after test execution
// npx playwright test --reporter=list -> to show test results in list format in console
// npx playwright test --reporter=html -> to generate HTML report after test execution
// test-results with last-run.json file is generated in the project root directory after test execution
// playwright-report folder with index.html is generated in the project root directory after HTML report generation

// In cypress assertions are done using chai/Mocha library but in Playwright assertions are done using Playwright's built-in expect library
// Playwright's expect library provides various assertion methods to validate the state of web elements, page properties, etc.
// Example: expect(page).toHaveTitle("Expected Title"), expect(locator).toBeVisible(), expect(value).toBe(expectedValue), etc.
// no need to explicitly close context or page, Playwright test runner will handle it automatically after the test execution.
// import {expect} from '@playwright/test' for assertions
// On test failure automatically report opnes once configured in config.js file