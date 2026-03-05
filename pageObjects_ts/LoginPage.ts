import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page : Page
    userEmailInput : Locator
    userPasswordInput : Locator
    loginInButton : Locator
    forgotPasswordLink : Locator

    constructor(page:Page) {
         //keep all the locators in constructor because when LoginPage object is called it will automatically initialize all the locators and we can use those locators in our test cases

        this.page = page; // assign the page value to this.page so that we can use this.page to navigate to the login page and also to initialize the locators
        this.userEmailInput = page.locator('#userEmail');
        this.userPasswordInput = page.locator('#userPassword');
        this.loginInButton = page.locator('#login');
        this.forgotPasswordLink = page.locator('.forgot-password-link');
        // from where page.locator is coming,add a reference of page in constructor and assign it to this.page so that we can use this.page.locator to initialize the locators
        // page value which is coming from testcase is the argument of constructor
        // 
    }

    async goToLoginPage() {
        await this.page.goto('https://rahulshettyacademy.com/client');
        // here this.page is the reference of page which we have assigned in constructor and we can use this.page to navigate to the login page
        // but page does not have life here because we have not assigned it to this.page in constructor, so we need to assign it to this.page in constructor and then we can use this.page to navigate to the login page
    }

    async login(email:string,password:string) {
        await this.userEmailInput.fill(email)
        await this.userPasswordInput.fill(password)
        await this.loginInButton.click()
        await this.page.waitForLoadState('networkidle'); // wait for the network to be idle after clicking the login button, this will ensure that the page is fully loaded before we proceed with the next steps in our test case
    }


}

//module.exports = { LoginPage } // common JS Syntax
// export default {LoginPage} // ES6 Syntax