import { test,expect } from '@playwright/test';

test('Partial and Page Screenshot',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'}) // partial screen shot
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'})// complete page screenshot , will create a file in root folder
    await expect(page.locator("#displayed-text")).toBeHidden();
})
test('Visual Testing',async({page})=>{
    // What is visual tetsing ?
    // Basically we take a screenshot and store image.
    // later on every day we go to that page in test and agian take screenshot and compare it with original one
    // if any error visually like pixels,aligments buttons etc it will throw error
    await page.goto('https://www.rediff.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
    // for first time this will fail as we dont have landing.png, but it will take screenshot and put it in root folder
    // next time it will compare
    // page.screenshot() takes screenshot only for that instance
    // and in first instance it craetes a folder inside test folder will create specfile-snapshot folder
    // in second run when it compares if it fails it will give actual.png,failed.png
})