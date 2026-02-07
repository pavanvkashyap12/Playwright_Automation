const {test,expect} = require('@playwright/test')

test('Alert Popups',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();


    // Java Popups we cannot spy and get locator of alert popups
    // In playwright we call it dialogs
    // So we have to use the event listener to handle these popups
    // we can use page.on to listen to the dialog event
    // page.on is used to handle event. Ex: dialog, popup, request, response etc
    // page.on('event name', callback function) page.on('close', ()=>{})
    // In our case event name is 'dialog' and callback function will have dialog object as parameter

    // page.on('dialog', async(dialog)=>{
    //     console.log(dialog.message());
    //     await dialog.accept("Yes, I am sure!") // to accept the alert popup
    //     // await dialog.dismiss() // to dismiss the alert popup
    // });



    // AI generated code starts here
    // await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // // click on confirm button - accept
    // page.once('dialog', async dialog => { await dialog.accept(); });
    // await page.locator('#confirmbtn').click();

    // // click on confirm button - dismiss
    // page.once('dialog', async dialog => { await dialog.dismiss(); });
    // await page.locator('#confirmbtn').click();
    // AI generated code ends here


    // This is correct code i.e first register the event listener and then perform the action which triggers the dialog
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    // Risky If the confirm dialog pops immediately after the click, the listener might be registered too late.
    // await page.locator("#confirmbtn").click();
   //  page.on('dialog', dialog => dialog.accept());

//    Use page.once or Promise.all to avoid side effects and race conditions:
// await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

// page.once('dialog', dialog => dialog.accept());
// await page.locator("#confirmbtn").click();

// Or explicitly wait for the dialog:
// await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

// await Promise.all([
//   page.waitForEvent('dialog').then(dialog => dialog.accept()),
//   page.locator("#confirmbtn").click()
// ]);

// HOOVER
await page.locator("#mousehover").hover();
await page.locator("text=Top").click();
})