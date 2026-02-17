import { test, request, expect } from '@playwright/test'
import APIUtils from './utils/APIUtils.js';

// we have to check when there are no orders there is message called no orders
// for this we need a account that does not have any orders
// or we can intercept and do it as orders are rendering from API call
// or in before class delete all orders in orders page
// here we are injecting fake response so that in UI message is displayed as per the response

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


test('Place the order API Test', async ({ page }) => {
    page.addInitScript((value) => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');
    // now before going to orders we need to intercept and inject fake response
    // for that we have to use route, meaning route it to how we require
    // route(which url we want to route,how you want to route)
    // route('url', async Function)
    // (intercepting response -> API response-> inject fake response -> send to brwoser -> render UI) 

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
        async route => {
            const response = await page.request.fetch(route.request())// this route is the urland fetch gets response,
            // this route has properties like request,response, we have to do route.request because
            // we have sent only request url in line 42 hence it makes call manually and we get response
            // and we store that in a variable and that response we can modify using fullfill
            // fullfill will send response to browser, fullfill method expect to have body and here we need to fake it 
            let body = JSON.stringify(fakePayload) // this is in JavaScript Object so convert it to JSON String
            await route.fulfill({
                // in fullfill we need to lot of things like contenttype,body, headers etc...
                // if we keep empty by default whatever route have line 50 it will use it
                // here we have to send body, so now from response only body will be overriden what route have
                // but all others like headers,contenttype will be same. So we need to give response and also what to override
                response,
                body
            })
        }
    )
    // now the body is null and when you go to orders it will show no orders message 
    // routing has to happen before clicking orders bcz when clicked this url is called and hence injects fake body

    const myOrders = page.locator('button[routerlink*="myorders"]')
    await myOrders.click()
    // In case if you get Error: apiRequestContext.fetch: Request context disposed that is bcz no await in route.fullfill
    // Or this  is bcz before getting original response it is trying to inject fake response hence wait till the response is received from request url
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca')
    const mesageLocator = page.locator('.mt-4')
    const message = await mesageLocator.textContent()
    expect(message).toBe(' You have No Orders to show at this time. Please Visit Back Us ')

})

// NOTE : url is unique for each user hence use url: https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*
// * -> it can be anything after / , *-> wildcard regular expression

// HERE we faked response NEXT fake request call 
