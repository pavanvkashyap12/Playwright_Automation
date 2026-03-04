import { test, request, expect } from '@playwright/test'
import APIUtils from './utils/APIUtils.js';

// Security test scenario,fake request call
// whenever we click on view order is order details it will make a GET call and get all details here orderid id concatinated in url
// Scenario: Here hackers can tweak request call by sending other orderid that does not belong to the user
// when done it should give 403 error


let response;
const fakePayload = {
    data: [], message: 'No Orders'
}
const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};
const orderPayload = {
    "orders": [{ "country": "Cuba", "productOrderedId": "696886c0c941646b7a9a3b53" }]
}

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})
 

test('@API Place the order API Test', async ({ page }) => {
    page.addInitScript((value) => {

        window.localStorage.setItem('token', value);
    }, response.token);

    // login and reach orders page
    page.addInitScript((value) => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');
    const myOrders = page.locator('button[routerlink*="myorders"]')
    await myOrders.click()
    // now before clicking on view we have intercept and we have to tell it before only
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async route => await route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=123' })
        // route.continue will use same url and we can modify what we want to like body , query params etc..
    )
    await page.locator('button:has-text("View")').nth(0).click()
    expect(await page.locator('.blink_me').textContent()).toBe('You are not authorize to view this order')
    await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order')



})
