const { expect } = require('@playwright/test');
class CartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator('div li').first();
        this.producstText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator('button[routerlink*="myorders"]');
        
        this.checkoutbtn = page.locator('text=Checkout');
    }

    getProductLocator(productName) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }

    async checkout() {
        await this.checkoutbtn.click();
    }

    async verifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor() // wait for the cart products to be visible before verifying the product is displayed in the cart
        await this.getProductLocator(productName).waitFor()
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }
}
module.exports = { CartPage }