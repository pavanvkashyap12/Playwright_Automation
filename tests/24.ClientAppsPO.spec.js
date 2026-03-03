const {test,expect} = require('@playwright/test');
const {LoginPage }= require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');


test('Login test with PageObject Model',async({page})=>{
    const email = 'anshika@gmail.com';
    const password = 'Iamking@000';
    const productName = 'ZARA COAT 3';
    const loginPage = new LoginPage(page); // create an object of LoginPage class and pass the page value to the constructor
    await loginPage.goToLoginPage(); // call the goToLoginPage method to navigate to the login page

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
    
    // search product and add to cart
    const dashboardPage = new DashboardPage(page); // create an object of DashboardPage class and pass the page value to the constructor
    await dashboardPage.searchProduct(productName); // call the searchProduct method to search for the product and add it to the cart
    await dashboardPage.navigateToCart(); // call the navigateToCart method to navigate to the cart page

    // There is concept called PageObjectManager which will manage all the page objects and we can call the page objects from the page object manager, this will help us to avoid the problem of creating multiple objects of the same class in different test cases, we can create a single object of the class in the page object manager and then we can call that object in our test cases, this will help us to avoid the problem of creating multiple objects of the same class in different test cases and also it will help us to manage all the page objects in a single place
    // In this spec we are creting multiple objects like loginPage,dashbordPage etc 
    // So use PageObjectManager to manage all the page objects and we can call the page objects from the page object manager, this will help us to avoid the problem of creating multiple objects of the same class in different test cases, we can create a single object of the class in the page object manager and then we can call that object in our test cases, this will help us to avoid the problem of creating multiple objects of the same class in different test cases and also it will help us to manage all the page objects in a single place
})