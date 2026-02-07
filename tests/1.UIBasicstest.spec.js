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

test('Login Test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //await page.locator("#username").type("rahulshettyacademy");
    // type is now deprecated, use fill()
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("input[name='password']").fill("learning");
    await page.locator('#signInBtn').click();
});

test('Login Test Failed Click Fill TextContent', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //await page.locator("#username").type("rahulshettyacademy");
    // type is now deprecated, use fill()
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("input[name='password']").fill("wrongpassword");
    await page.locator('#signInBtn').click();
    // Using toContainText on locator
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    // here for errror message style="display:none" once it appears it will be display:block
    // using toContain on string
    // const text = await page.locator("[style*='block']").textContent() // OR partial text locator page.locator("[style* = 'block']")
    // expect(text).toContain("Incorrect username/password.");
});

test('Login Test Store locators and Clear and multiple elements', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Storing locators in variables sould be done after page is created and before any action is performed 
    // or else it will give error that page is not defined ReferenceError: Cannot access 'page' before initialization
    const userName = page.locator("#username");
    const password = page.locator("input[name='password']");
    const signInBtn = page.locator('#signInBtn');       
    const errorMessage = page.locator("[style*='block']");
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const title = "LoginPage Practise | Rahul Shetty Academy";
    const cardTitles = page.locator(".card-body .card-title a");
    // no need await here for locators bcz we are not performing any action on locators yet only storing in a variable
    await page.goto(url);
    await expect(page).toHaveTitle(title);
    await userName.fill(""); // This clears the input field
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signInBtn.click();
    //console.log(await page.locator(".card-body .card-title a").textContent());
    //Here 4 elements are found and hence failed with Error: locator.textContent: Error: strict mode violation: locator('.card-body .card-title a') resolved to 4 elements:
    //To handle multiple elements use nth(index) starting from 0
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.nth(2).textContent());
    console.log(await cardTitles.nth(3).textContent());
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.last().textContent());
    console.log(await cardTitles.allTextContents());// here it passing as we are waiting in above lines for each element
    console.log(await cardTitles.count());

    // Here untill first element is attached to DOM it will wait
    //console.log(await cardTitles.first().textContent());

    // Here it will not wait for all elements to be attached to DOM and will throw error if any one of them is not attached
    // beacuse it is a array and array can have 0 elements also and it assumes that is ok
    // console.log(await cardTitles.allTextContents());

    // check for what actions will wait here https://playwright.dev/docs/actionability
});