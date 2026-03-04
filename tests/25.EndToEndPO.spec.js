const { test, expect } = require('@playwright/test');
const { PageObjectsManager } = require('../pageObjects/PageObjectsManager');


test('@E2E Client App login', async ({ page }) => {
    const poManager = new PageObjectsManager(page);
    //js file- Login js, DashboardPage
    const username = "anshika@gmail.com";
    const password = "Iamking@000"
    const productName = 'Zara Coat 4';
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