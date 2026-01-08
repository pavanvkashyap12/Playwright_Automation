import {expect, test} from '@playwright/test'

test('First Playwright Test', async ({browser}) => {
    // Create a new browser context
    const context = await browser.newContext(); 
    // Create a new page in the context
    const page = await context.newPage();
    // Navigate to a webpage
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Second Playwright Test', async ({page}) => {
    // Navigate to a webpage
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // Assertion using Playwright's expect library
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    
    // USING THEN but it is not recommended way
    // await page.title().then(title => {
    //     console.log("Page Title:", title);
    //     expect(title).toBe("LoginPage Practise | Rahul Shetty Academy");
    // });
});

