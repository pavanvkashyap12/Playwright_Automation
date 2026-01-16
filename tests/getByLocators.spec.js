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


