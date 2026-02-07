const {test, expect} = require('@playwright/test')
test('End to end test', async({browser}) => {
    const emailId = 'pavan@gmail.ocm'
    const productName = 'Automation 8'
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = 'https://rahulshettyacademy.com/client/#/auth/login';
    const products = page.locator('.card-body')
    const email = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const login = page.locator('#login')
    const cart = page.locator("[routerlink*='cart']") // locator with regular expression on attribute=value
    const checkoutbtn = page.locator('text=Checkout')
    await page.goto(url)
    await email.fill('pavan@gmail.ocm')
    await password.fill('test@123A')
    await login.click()
    await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()
    const count = await products.count() // Error faced here was missed await for count hence count was 0 and was not clicking on cart
    for (let i=0 ; i<count; i++){
        if(await products.nth(i).locator('b').textContent() === productName) {
            console.log(await products.nth(i).locator('b').textContent() + i)
            // here locator is used to search element inside card-body
            // once product is found add it to cart
            await products.nth(i).locator('i.fa.fa-shopping-cart').click()
            // OR  
            //await products.nth(i).locator('text= Add To Cart').click(); // -> new locator introduced using text
            break;
        }
    }
    await cart.click();
    // after clicking on cart it takes few seconds to open cart page,plawright will immediatley throw error not found.
    // isVisible method does not ave auto-wait check AutoWaitng doc
    // So we have to wait till page loads, cart page have li and we have to wait till li is visible
    page.locator('div li').first().waitFor() // this will fail wit strict mode error as there are 6 elements so do first()
    // new locaator strategy -> psuedo class, searched for h3 which has Automation 8 
    const bool = await page.locator("h3:has-text('Automation 8')").isVisible()
    expect(bool).toBeTruthy();
    await checkoutbtn.click()
    await page.locator('.input.txt').nth(2).fill('255')
    await page.locator('.input.txt').nth(3).fill('pavan')

    // Handling Dynamic DropDown
    //page.locator('placeholder="Select Country"').fill('Ind')
    // here fill will type at a time and hence no suggestions hance use press sequentialy
    // which types one by one and suggestions start showing, here we can add a delay b/w eac keyPress if server is busy
    // by adding a parameter pressSequentially('ind',{delay:150})
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind')
    const options = page.locator('.ta-results')
    await options.waitFor()
    const optionSelector = await options.locator('button').count()
    for (let i=0;i<optionSelector;i++ ){
        let text = await options.locator('button').nth(i).textContent()
        if (text === ' India'){
            options.locator('button').nth(i).click();
            break;
        }
    }
    const emailLocator = await page.locator('.user__name label').textContent()
    expect(emailLocator).toBe(emailId)
    await page.locator('.action__submit').click()
    await expect (page.locator('.hero-primary')).toHaveText('Thankyou for the order. ')
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(orderId)

    // Finding multiple orders in order page
    // scan all orderIDs and click on view of that orderID
    const myOrders = page.locator('button[routerlink*="myorders"]')
    await myOrders.click()
    const row = page.locator('tbody tr')
    // here after click which waits we are doing count which does not have outwait hence wait for table
    await page.locator('tbody').waitFor()
    const rowCount = await row.count()

    for (let i=0; i<rowCount; i++){
        const rowOrderId = await row.nth(i).locator('th').textContent()
        if(orderId.includes(rowOrderId)){
            await row.nth(i).locator('.btn').first().click();
            break;
        }
    }
// here we arenot waiting for view details bcz here we are using textContent() which has autowait
    const orderIdd = await page.locator('.col-text ').textContent()
    //expect(orderId).toBe(orderIdd)
    expect(orderId.includes(orderIdd)).toBeTruthy()
})