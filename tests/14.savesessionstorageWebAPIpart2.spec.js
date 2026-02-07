// previously we stored the token in local storage
// but some apps are complex which have session storage,cookies etc
// For this kind of apps like banking we first login in UI and collect all in
// information from storage and then we can use that information to login directly.
// first tetcase UI and then we can use that information to login directly in next testcases
// since  all tests run on new page, so for next testcases we can bypass UI login

import {test, expect} from '@playwright/test';

let webContext;

test.beforeAll('Save session storage and use it in next test', async ({browser}) => {

    // Login via UI and get all information from session storage and save it in a variable
    // Here cookies for a context not for pages
    // One context can have multiple pages and all pages will share same cookies, local storage and session storage
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    // Save session storage to a file
    // const sessionStorage = await context.storageState();
    // console.log(sessionStorage);
    await context.storageState({path: 'sessionStorage.json'});
    // Now sessionStorage.json file will have all the information of session storage and cookies which we can use in next testcases to login directly without UI login
    // it is created in root folder of project, we can create a folder and save it there as well
    // This file is overwritten every time we run the test, so it will have latest information of session storage and cookies
    // Now we have to open new browser context by passing this sessionStorage.json file to use the information in next testcases
    // storageState is a property of browser context, we can use it to set the storage state for a context, it can be used to set the cookies, local storage and session storage for a context
    webContext = await browser.newContext({storageState: 'sessionStorage.json'});
    // now we have created newContext , use this webContext in next testcases to create a page and login directly without UI login
})

test('Use session storage to login directly', async ({}) => {
    console.log('Test started');
    // Since we are using a webContext there is no need of fixture here is this test, we can directly use webContext to create a new page and login directly without UI login
    const newPage = await webContext.newPage();
    await newPage.goto('https://rahulshettyacademy.com/client');
    // Now we are already logged in, so we can directly verify the order in UI without login again
    await newPage.locator('button[routerlink*="myorders"]').click();
    await newPage.waitForLoadState('networkidle');
    const orderId = await newPage.locator('.ng-star-inserted').nth(2).textContent();
    console.log(`Order ID from UI: ${orderId}`);
})
// This approach is useful when there are multiple testcases which require login and we want to avoid UI login for each testcase, we can login once and save the session storage and use it in next testcases to login directly without UI login, this will save time and make our tests faster.