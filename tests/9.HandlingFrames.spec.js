import {test,expect} from '@playwright/test'


test('Handling Frames',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();   
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


    // I Frame handling in Playwright , this will have a tag name called iframe/frameset
    const framesPage = page.frameLocator("#courses-iframe"); // now we can use framesPage to locate elements inside the iframe,so this is like a separate page object for the iframe
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    // here 2 elments are matching so we have used one that is visible to click
    const textContent = await framesPage.locator('div.text h2').textContent();
    console.log(textContent);
    const count = textContent.split(" ")
    const subscribers = count[1];
    console.log(subscribers);
});