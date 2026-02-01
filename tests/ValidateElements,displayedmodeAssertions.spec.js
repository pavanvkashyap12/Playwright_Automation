import { test,expect } from '@playwright/test';

test('Validate elements displayed mode assertions',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com")

    // go back to previous page
    await page.goBack();

    // go forward to next page
    await page.goForward();

    // go back to previous page
    await page.goBack();

    // assert element visibility
    await expect(page.locator("#displayed-text")).toBeVisible();
    // hide the element
    await page.locator("#hide-textbox").click();
    // assert element is not visible
    await expect(page.locator("#displayed-text")).not.toBeVisible();
    // OR 
    await expect(page.locator("#displayed-text")).toBeHidden();

})