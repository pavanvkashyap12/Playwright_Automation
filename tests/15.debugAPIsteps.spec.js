import {test, expect,request} from '@playwright/test';
import APIUtils from './utils/APIUtils.js';

let response;
const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};
const orderPayload = {
"orders":[{"country":"Cuba","productOrderedId":"696886c0c941646b7a9a3b53"}]
}

test.beforeAll(async ()=> {
    // Creating API context here send it to utils class, so a constructor will be created to accept this context
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload); // this response has token and orderID
    // Till now we have created order using API but we also want to verify this order in UI, so for that we have to set token in local storage and then navigate to client app
})


test('Place the order API Test', async ({page}) => {
    // setting token in local storage
    page.addInitScript((value) => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client'); // navigate to any page to initialize the local storage
    // Now it directly logged in to the client app as token is already set in local storage
    const myOrders = page.locator('button[routerlink*="myorders"]')
    await myOrders.click()
    const row = page.locator('tbody tr')
    await page.locator('tbody').waitFor()
    const rowCount = await row.count()

    for (let i=0; i<rowCount; i++){
        const rowOrderId = await row.nth(i).locator('th').textContent()
        if(response.orderId===(parseInt(rowOrderId))){
            await row.nth(i).locator('.btn').first().click();
            break;
        }
    }
    // const orderIdd = await page.locator('.col-text ').textContent()
    // //expect(orderId).toBe(orderIdd)
    // expect(orderIdd.includes(response.orderId)).toBeTruthy()
})

// npx playwright test tests/15.debugAPIsteps.spec.js --debug
// This will open the Playwright Inspector and we can debug our test step by step, we can also use breakpoints to debug our test, we can also use console.log to print the values in console and debug our test, this is very useful when we want to debug our API tests and we want to see the request and response details, we can also use the network tab in Playwright Inspector to see the request and response details, this will help us to debug our API tests effectively.
// Debuuger works only in Chromium browser, so if we want to debug our tests in Firefox or Webkit, we can use console.log to print the values in console and debug our test, this is a good alternative when we want to debug our tests in other browsers.
// Debugging of playwright inspector works on only UI part
// meaning in beforeAll all the API calls is executed without pause
// it only paused when it reached UI part

// How to debug API calls in Playwright Inspector?
// Example API failed with cannot order?
// Go to package.json -> scripts -> add test:npx playwright test tests/15.debugAPIsteps.spec.js --headed
// Now in VS code put a debug point , then run in npm debug mode 
// in terminal we can see it started in debug mode
// we can see it runs in debug mode, we can see next, run full mode, controls i.e step over,step in, step out etc..
// also in config.js increase timeout to 1 min, so that we have enough time to debug our test
// because playwright will give timeout error when test does not start in 30seconds like configure


// DETAIL VIEW PF TRACE VIEWER TO UNDERSTAND THE API Logging Req/Responses
// In config we have given trace : retain-on-failure which gives traces/.zip
// for time being set it as on i.e trace:on which will give traces for passed and failed tests
// in test-results folder we have .zip folder, it will have a seprate folder for beforeAll and tests 
// go to trace.playwright.dev and open the zip to see all logs