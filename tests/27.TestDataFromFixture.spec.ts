import {test,expect} from "@playwright/test"
import {PageObjectsManager} from "../pageObjects_ts/PageObjectsManager"
import {customTest}  from "../tests/utils_ts/test_base" // we are importing customTest from test_base.ts which has our test data as a fixture, so that we can use that fixture in our test case by importing it and using it as a parameter in our test case, so that we can access the test data in our test case without importing the JSON file directly in our test case, this way we can keep our test data separate from our test cases and also we can use the same test data in multiple test cases without importing the JSON file multiple times.

// Here we are using customTest which is created in test_base.ts and it has our test data as a fixture, so we can use that fixture in our test case by importing it and using it as a parameter in our test case, so that we can access the test data in our test case without importing the JSON file directly in our test case, this way we can keep our test data separate from our test cases and also we can use the same test data in multiple test cases without importing the JSON file multiple times.


customTest(`Client App login with `, async ({ page,testDataForOrder }) => {
        const poManager = new PageObjectsManager(page);
        //js file- Login js, DashboardPage
        const username = testDataForOrder.username;
        const password = testDataForOrder.password;
        const productName = testDataForOrder.productName;
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
        let orderId :any
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });