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

test('Static and Dnamic Dropdowns, Radio, checkbox ',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const staticDropdown = page.locator('select.form-control');
    const url = 'https://rahulshettyacademy.com/loginpagePractise/'
    const userRadio = page.locator('.radiotextsty').last()
    const adminRadio = page.locator('.radiotextsty').first()
    const okPopup = page.locator('#okayBtn')
    await page.goto(url);
    // Select static dropdown
    // await staticDropdown.selectOption('consult')
    // //await page.pause(); // jus to check in UI, this will open plawright inspector
    // // Radion buttons
    await adminRadio.click(); // OR .check()
    // // Now popup appears which is not alert but a div based popup, alerts are handled using page.on('dialog'....)
    await okPopup.click(); // click will wait for the element to be visible and enabled upto 30 sec by default
    await expect(adminRadio).toBeChecked();
    await expect(adminRadio).isChecked().toBe(true);//returns boolean value not much used
    expect(await adminRadio.isChecked()).toBeTruthy();
    // checkbox example
    const terms = page.locator('#terms');
    await terms.check();
    await expect(terms).toBeChecked();
    // uncheck
    await terms.uncheck();
    await expect(terms).not.toBeChecked();
    expect(await terms.isChecked()).toBe(false); 
    expect(await terms.isChecked()).toBeFalsy();
});

test('Check Attribute Values', async ({page}) => {
    const userEmail = page.locator("#username");
    const password = page.locator("#password");
    const loginBtn = page.locator('#signInBtn');
    const link = page.locator("a[href*='documents-request']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(userEmail).toHaveAttribute("name", "username");
    await expect(password).toHaveAttribute("type", "password");
    await expect(link).toHaveAttribute("class", "blinkingText");
    await expect(loginBtn).toHaveAttribute("value","Sign In")
    await expect(link).toBeVisible();
    await expect(loginBtn).toBeEnabled();
   expect(await loginBtn.isVisible()).toBeTruthy();
   expect(await loginBtn.isEnabled()).toBeTruthy();
});