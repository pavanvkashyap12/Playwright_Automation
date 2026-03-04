const {test,expect} = require('@playwright/test');
const {PageObjectsManager} = require('../pageObjects/PageObjectsManager');

test('Login test with PageObject Model',async({page})=>{
    const email = 'anshika@gmail.com';
    const password = 'Iamking@000';
    const productName = 'ZARA COAT 3';
    const pageObjectsManager = new PageObjectsManager(page);

    const loginPage = pageObjectsManager.getLoginPage(); // call the getLoginPage method to get the object of LoginPage class
    await loginPage.goToLoginPage();


    // Check UI elements are visible or not
    await expect(loginPage.userEmailInput).toBeVisible();
    await expect(loginPage.userPasswordInput).toBeVisible();
    await expect(loginPage.loginInButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    // Get the placeholders
    expect(await loginPage.userEmailInput.getAttribute('placeholder')).toBe('email@example.com');
    expect(await loginPage.userPasswordInput.getAttribute('placeholder')).toBe('enter your passsword');
    expect(await loginPage.loginInButton.getAttribute('value')).toBe('Login');
    await loginPage.login(email,password);

    const dashboardPage = pageObjectsManager.getDashboardPage(); // call the getDashboardPage method to get the object of DashboardPage class
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();


});