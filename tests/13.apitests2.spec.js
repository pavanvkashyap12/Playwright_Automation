import {test, expect,request} from '@playwright/test';
import APIUtils from './utils/APIUtils.js';

let response;
const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};
const orderPayload = {
"orders":[{"country":"Cuba","productOrderedId":"696886c0c941646b7a9a3b53"}]
}

test.beforeAll(async ()=> {
    // Creating API context here send it to utils class, so a constructor will be created to accept this context
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload); // this response has token and orderID
    // Till now we have created order using API but we also want to verify this order in UI, so for that we have to set token in local storage and then navigate to client app
})


test('Place the order API Test', async ({page}) => {
    // setting token in local storage
    page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client'); // navigate to any page to initialize the local storage
    // Now it directly logged in to the client app as token is already set in local storage
    const myOrders = page.locator('button[routerlink*="myorders"]')
    await myOrders.click()
    const row = page.locator('tbody tr')
    await page.locator('tbody').waitFor()
    const rowCount = await row.count()

    for (let i=0; i<rowCount; i++){
        const rowOrderId = await row.nth(i).locator('th').textContent()
        if(response.orderId===(parseInt(rowOrderId))){
            await row.nth(i).locator('.btn').first().click();
            break;
        }
    }
    const orderIdd = await page.locator('.col-text ').textContent()
    //expect(orderId).toBe(orderIdd)
    expect(orderIdd.includes(response.orderId)).toBeTruthy()
    


})

