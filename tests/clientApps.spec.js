const {test, expect} = require('@playwright/test');

test('Client App Login Test', async ({page}) => {
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator('[value="Login"]');
    const cardTitles = page.locator(".card-body b");

    await page.goto('https://rahulshettyacademy.com/client');
    await userEmail.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginBtn.click();

    // const titles = await cardTitles.allTextContents();
    // console.log(titles); This is will not work meaning will give empty array as output
    // Here a API call is made and after that the cards are loaded on the page
    // So we need to wait for the API call to complete and then the cards will be loaded
    await page.waitForLoadState('networkidle'); // wait until all network calls are finished
    const titles = await cardTitles.allTextContents();
    console.log(titles);
    // Now allTextContents will work as we are waiting for the network calls to complete before fetching the card titles
    // run only this spec file using npx playwright test tests/clientApps.spec.js
    // waitForLoadState('networkidle') is discouraged to use generally and is flaky
    // instead we can use waitFor() if it returns single element
    // Ex: await cardTitles.waitFor();
    // use this like await cardTitles.first().waitFor(); if multiple elements are there
    // and then use allTextContents() to get all the titles and this will pass consistently
    // see below test for reference
});

test('Client App Login Test with waitFor()', async ({page}) => {
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator('[value="Login"]');
    const cardTitles = page.locator(".card-body b");

    await page.goto('https://rahulshettyacademy.com/client');
    await userEmail.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginBtn.click();
    await cardTitles.first().waitFor(); // wait for the first card title to be attached to DOM
    const titles = await cardTitles.allTextContents();
    console.log(titles);
});