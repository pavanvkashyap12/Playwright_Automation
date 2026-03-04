const { test, expect } = require('@playwright/test');
const { PageObjectsManager } = require('../pageObjects/PageObjectsManager');
const dataSet = JSON.parse(JSON.stringify(require('../testdata/placeOrderTestData.json')));
// Here were converting json file into JS Object and then we are using it in our test case
// but parsing may have some issues like UTF-8 encoding, so we are using stringify to convert it to String and then parsing it again to avoid any issues



test('Client App login', async ({ page }) => {
    const poManager = new PageObjectsManager(page);
    //js file- Login js, DashboardPage
    const username = dataSet.username;
    const password = dataSet.password;
    const productName = dataSet.productName;
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(username, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

for (let data of dataSet) {
    test(`Client App login with ${data.productName}`, async ({ page }) => {
        const poManager = new PageObjectsManager(page);
        //js file- Login js, DashboardPage
        const username = data.username;
        const password = data.password;
        const productName = data.productName;
        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goToLoginPage();
        await loginPage.login(username, password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(productName);
        await cartPage.checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}


// Now if we want to use multiple data sets, then make a JSON array in placeOrderTestData.json
// Now data comes from array and runs 2 times as it has 2 objects in array, so we can run our test with multiple data sets without changing our test code, we just need to add more objects in JSON array and it will run for all the data sets.
// Also in report there are two testcases

// Passing data as a fixture. This supprts only one set of data vaildation
// Create test_base.js in utils

