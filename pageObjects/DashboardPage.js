class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
    }


    async searchProductAddCart(productName) {
        const tiltles = await this.productsText.allTextContents();
        console.log('Titles:', tiltles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('text="Add to Cart"').click(); // text="Add to Cart" is chain locator so did not add in constructor
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

    async navigateToOrders() {
        await this.orders.click();
    }

}
module.exports = { DashboardPage };