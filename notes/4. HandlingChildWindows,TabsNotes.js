import { expect } from "@playwright/test";

test('Child Window and Tabs Handling', async({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const linkLocator = page.locator("a[href*='documents-request']");
    await page.goto(url);
    await linkLocator.click();
    // Now we are going to handle new tab or child window, before clicking we 
    // have to tell playwright that wait for an event of new page opening
    // First start {browser} fixture in the test parameter
    // Page that we created above is the parent page and has knowledge of only
    // original page and not have the knowledge of new tab or child window
    // So we ave to switch context
    const page2 = await context.waitForEvent('page'); // this will return a promise, we wait for a page event
    // and catch it in a variable
    // But problem is that the as soon as I clicked new page is opened and then we are waiting for event
    // So this should be in listening stage, So add it before clicking the link

    const page3 = await context.waitForEvent('page'); // this will return a promise, we wait for a page event
    await linkLocator.click();
    // But on more problem is JS is async
    // Also we are not sure how much time it will take to open new tab
    // and we are telling in line19 wait untill the new page is opened
    // but click is happening after that so there is no point in waiting
    // So we have to do both things simultaneously, before and after will not work
    // Hence these to things should happen together
    // So we can use Promise.all to do both things together which takes an array of promises
    Promise.all([context.waitForEvent('page'), linkLocator.click()]);
    // Now it will come out of Promise.all when both promises are resolved, if any one promise is not resolved script will bbe failed
    // We can store these in variables also
    const [newPage] = await Promise.all([context.waitForEvent('page'), linkLocator.click()]);
    // here context.waitForEvent('page') returns page
    // linkLocator.click() does not return anything
    // IW question ? What you do when two steps are dependent on each other
    // Ans: You can not use Promise.all, you have to do one after another using await
    // Now newPage is the new tab or child window
    // We have to wait for this page to load completely before performing any action
    await newPage.waitForLoadState();
    console.log(await newPage.title());
    const text = await newPage.locator(".red").textContent()
    console.log(text);
    await expect(newPage.locator(".red")).toContainText("Documents request");

    // Now in newPage we can perform any action as we do in page
    // take the whole String split and get the email id alone
    // Then add it to parent page input field
    const email = text.split("@") // returns array
    email[1] // that is after @ , then again split with space
    const domain = email[1].split(" ")[0];
    console.log(domain);
    // go back to parent page
    await page.locator("#username").fill(domain);

    // suppose on click two windows are opened how to handle
    const [newPage2,newPagge3] = await Promise.all([context.waitForEvent('page'), linkLocator.click()]);
    // now newPage2 and newPage3 are the two new tabs opened

})

// Difference between textContent() and valueInput() methods
// textContent(): It is used to get the text inside any element like div, span, p, h1 etc., It will not work on input field, this is already present in DOM
// valueInput(): It is used to get the value inside input field like text box, password box etc., It will not work on other elements like div, span etc.,this we are entering at runtime in DOM

// Difference between textContent, innerText and innerHTML
// textContent: It will give the text inside the element including hidden text also
// innerText: It will give the visible text only, it will not consider hidden text
// innerHTML: It will give the complete HTML code inside the element including tags also