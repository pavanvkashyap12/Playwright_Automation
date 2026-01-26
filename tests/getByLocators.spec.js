import test, { expect } from '@playwright/test'

test('Playwright special locators ', async({page})=> {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    // getByLabel
    await page.getByLabel('Check me out if you Love IceCreams!').check()
    await page.getByLabel('Employed').check()
    await page.getByLabel('Gender').selectOption('Female')
    
    //getByPlaceholder
    await page.getByPlaceholder('Password').fill('test@123')

    // getByRole - button
    await page.getByRole('button', {name:'Submit'}).click()
    
    // getByText
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    expect(await page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy()

   // getByRole -link
   await page.getByRole('link', {name:'Shop'}).click()

   await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click()
})

test('End to end using getByLocators', async({page}) => {
    const emailId = 'pavan@gmail.ocm'
    const productName = 'ADIDAS ORIGINAL'
    const passsword = 'test@123A'
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill(emailId)
    await page.getByPlaceholder('enter your passsword').fill(passsword)
    // if a tag name in button or class is btn we can getByRole('button')
    await page.getByRole('button',{name:'Login'}).click()
    await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()
    // using filter instead of for loop
    await page.locator('.card-body').filter({hasText:productName}).getByRole('button',{name:'Add To Cart'}).click()
    // only getByRole('button',{name:'Cart'}) will click on Add To Cart also
    // hence first listitem i.e li and then search for Cart
    await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click()
    await page.locator('div li').first().waitFor()
    await expect(page.getByText(productName)).toBeVisible()
    await page.getByRole('button',{name:'Checkout'}).click()
    await page.getByPlaceholder('Select Country').pressSequentially('ind')
    // there is british india and  india so we have to use nth(1)
    await page.getByRole('button',{name:' India'}).nth(1).click()
    await page.getByText('Place Order ').click()
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible()
})
    


