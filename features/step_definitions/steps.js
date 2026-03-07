import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { PageObjectsManager } from '../../pageObjects/PageObjectsManager.js'
import { expect, chromium } from '@playwright/test';

setDefaultTimeout(60 * 1000);// for whole spec //default time out is 5s               // only for Given block timeout
Given('a login to Ecommerce application with {string} and {string}', {timeout:10*1000}, async function (username, password) {
    // Here given should be same as that in feature file.
    // When "" is used in feature file cucumber considers it as a dynamic and place it in {string}

    // Here page does not mean anything because it is only when we use test but here we have not using test
    // Here browser also does not have context so we have to import playwright from '@playwright/test'
    // with this playwright we can create a browser object and then context and then page

    const browser = await chromium.launch({headless:false}); // add a property headless:false to not run headless
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pageObjectsManager = new PageObjectsManager(page);
    const loginPage = this.pageObjectsManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(username,password)
})
When('Add {string} item to cart', async function (product) {
    this.dashboardPage = this.pageObjectsManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(product);
    await this.dashboardPage.navigateToCart();
})
Then('Verify {string} is displayed in the Cart', async function (product) {
    const cartPage = this.pageObjectsManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(product)
    await cartPage.checkout()
})
When('Enter valid details and Place the order', async function () {
    const ordersReviewPage = this.pageObjectsManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
})
Then('Verify order present in OrderhistoryPage', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.pageObjectsManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})

// # WORLD CONSTRUCTOR
// # consider a whole scenario as a world, so variables in Given should be available any of the steps below usually it is called step definition
// # so variable should be available for every step as long as it is in same scenario
// So here  const pageObjectsManager = new PageObjectsManager(page); is in Given but not available for below also page.This is why WorldConstructor was created
// so use this.pageObjectsManager instead of const it will activate WorldConstuctor and now you can use the same instance everywhere
// Another way is to create a Global variable
// if we do not use this. it will show null for pageObjectsManager

// By default it will run in hedaless
// once tests is completed cucumber is still running so do npx cucumber-js --exit
// disable the message in terminal by adding  in cucumber.js file. For this create a new file in project level cucumber.js
