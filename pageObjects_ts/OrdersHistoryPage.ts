import { Locator, Page } from "@playwright/test";

export class OrdersHistoryPage {

    page:Page
    ordersTable:Locator
    rows:Locator
    orderdIdDetails:Locator
    //orderId:Locator Property 'orderId' has no initializer and is not definitely assigned in the constructor.ts(2564)

    constructor(page:Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId:any) { //any bcz we dont know if it is a string or number

        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }

}