// Playwright Inspectors, Trace Viewers, Codegen tool are all playwright dev tools not 3rd party tools

// add a flag debug to run in debug mode
// npx playwright test example.spec.js --debug

// PLAYWRIGHT INSPECTOR
// it will open playwright dev tool - inspector
// in that we can see locators and steps executed in left side
// in right side we can see locator strategies
// we can also hover on elements to see which element is selected

// Now this opens browser in one tab and playwright inspector in other tab we can do step by step execution like in intellij debugger
// This playwright inspector tab is called codegen tool
// In this there is a pick locator button on top left corner
// by clicking on that we can select elements on the browser tab and it will give locator strategies for that element in codegen tool tab
// You can also type a locator in the locator field to see that element highlighted in browser tab

// we can also generate code using this tool by clicking on record button on top left corner
// it will open a new browser instance and we can perform actions there and it will generate code for us in the codegen tool
// we can choose language and framework in which we want code to be generated
// we can copy that code and use it in our test files

// CODEGEN TOOL - automatic code generation tool provided by playwright
// we can also open codegen tool directly by using below command
// npx playwright codegen <url>
// example
// npx playwright codegen https://rahulshettyacademy.com/angularpractice/

// Lets see how we can record and playback using codegen tool
// npx playwright codegen https://rahulshettyacademy.com/angularpractice//
// it will open codegen tool and browser instance
// now perform actions on browser instance and see code getting generated in codegen tool
// we can copy that code and use it in our test files
// Moment we perform action in browser manually it will generate code in codegen tool
// We can also modify the code in codegen tool and re-run it to see the changes reflected in browser instance
// This is very useful for quickly generating code snippets for complex interactions
// We can also use this tool to explore locator strategies for elements on the page
// Overall codegen tool is a great way to quickly generate code and explore locators for playwright tests

// How to do assertions in codegen tool
// while recording if we want to do assertion we can right click on that element in browser instance
// and select assert element text or assert element attribute
// it will generate code for assertion in codegen tool
// we can copy that code and use it in our test files

// There is a assert text , assert value, assert snapshot, picklocator , assert visibilty
// Another thing in inspector is target which we can convert it to JAVA,python as playwright supports multiple languages
// We can also change the framework to use like jest,mocha etc
// This codegen tool is very useful for quickly generating code snippets and exploring locators for playwright tests


// REPORTS
// If we need a screenshot for every step in the report we can enable it in playwright.config.js
// module.exports = {
//   use: {
//     screenshot: 'on',
//     trace: 'on',
//   },
// };
// This will take screenshot for every step and add it to the report
// There is another property called trace to collect trace on each and evry step what happened in the test and get logs of each step
// reporter we have used html we can also use other reporters like Allure
// Now lets run all tests by npx playwright test
// After execution we can see the report by npx playwright show-report
// It will open the report in a new tab in browser
// In the report we can see the test results along with screenshots and trace for each step
// This is very useful for analyzing test results and debugging failed tests
// Overall reports are a great way to visualize test results and get insights into test execution

// After all tests executed we have 2 folders test-results and playwright-report
// test-results folder is created when we have screenshot or trace enabled in config file
// It contains screenshots and trace files for each test
// playwright-report folder is created when we run npx playwright show-report command
// It contains the HTML report for the test execution
// We can open the index.html file in playwright-report folder to view the report
// In the report we can see the test results along with screenshots and trace for each step
// This is very useful for analyzing test results and debugging failed tests
// Overall reports are a great way to visualize test results and get insights into test execution

// Every Step screenshot we can see in trace viewer, Sometimes trace viewer zip file should be opened in trace.playwright.dev
// So for each testcase there is a trace file created in test-results folder here 17
// To get traces only for failed tests we can set trace: 'on-first-retry' in config file
// OR trace: retain-on-on-failure



// TRACE VIEWER

// Trace viewer is a tool provided by playwright to view the trace of a test execution
// To use trace viewer we need to enable tracing in our test
// We can do this by adding the following code in our test file
// import { test } from '@playwright/test';
// test.use({ trace: 'on-first-retry' });
// This will enable tracing for the test and save the trace file in the output folder
// After the test execution we can open the trace viewer by using the following command
// npx playwright show-trace <trace-file-path>
// example
// npx playwright show-trace traces/trace.zip
// It will open the trace viewer in a new tab
// In trace viewer we can see the steps executed in the test along with screenshots, network requests, console logs etc
// We can also see the DOM snapshot at each step of the test
// This is very useful for debugging failed tests as we can see exactly what went wrong during the test execution
// Overall trace viewer is a great tool for debugging and analyzing playwright tests
// We can also generate trace for specific test by using test.info().trace.start() and test.info().trace.stop()
// example
// await test.info().trace.start({ screenshots: true, snapshots: true });
// // perform test actions
// await test.info().trace.stop();
//  This will generate trace for the specific test only 
// We can also enable tracing for all tests in the project by adding the following code in the playwright.config.js file
// module.exports = {
//   use: {
//     trace: 'on-first-retry',
//   },
// };
// This will enable tracing for all tests in the project and save the trace files in the output folder
// We can then open the trace viewer using the npx playwright show-trace command as mentioned earlier
