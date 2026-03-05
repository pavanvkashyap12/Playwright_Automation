import { LoginPage } from "./LoginPage"
import { DashboardPage } from './DashboardPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';
import { type Page, type Locator } from '@playwright/test' 
// IN TS we need to use import not require and use export key word before class

export class PageObjectsManager {

    page : Page
    loginPage : LoginPage // because LoginPage is going inside loginPage, that is LoginPage class Object
    dashboardPage : DashboardPage
    ordersHistoryPage : OrdersHistoryPage
    ordersReviewPage : OrdersReviewPage
    cartPage : CartPage

    constructor(page : Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}
