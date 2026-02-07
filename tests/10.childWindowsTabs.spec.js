import {test,expect} from '@playwright/test';

test('Child Window and Tabs Handling', async({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const linkLocator = page.locator("a[href*='documents-request']");
    await page.goto(url);
    // Promise.all to handle both click and wait for event together
    const [newPage] = await Promise.all([context.waitForEvent('page'),linkLocator.click()]);
    // Now newPage is the new tab or child window
    const newPageParagraph = newPage.locator(".red");
    await newPage.waitForLoadState();
    const newText = await newPageParagraph.textContent();
    const domain = newText.split('@')[1].split(' ')[0];
    console.log("Domain : " , domain);
    // go back to parent page
    await page.locator("#username").fill(domain);
    // Now get the entered value
    const inputValue = await page.locator("#username").inputValue();
    const textContent = await page.locator("#username").textContent();
    console.log("Input Value: "+inputValue);
    console.log("Text Content: "+textContent);
    // Input Value: rahulshettyacademy.com
    // Text Content: null
    // Hence textContent() does not work on input field
})