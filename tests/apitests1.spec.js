import {test, expect,request} from '@playwright/test';
import console from 'node:console';

// PLAYWRIGHT SUPPORTS API TESTING
// WE CAN TEST REST API USING PLAYWRIGHT
// WE CAN SEND GET, POST, PUT, DELETE REQUESTS AND VALIDATE THE RESPONSES
// icognito mode does not stroe cookies and cache,playwright creates a temp profile for each incognito context.
// So, incognito contexts are useful for testing scenarios where you want to ensure a clean state without any previous session data.
// but in incognito mode,if you close the context all the data will be lost.
// So, if you want to preserve certain data across incognito sessions, you can manually store and restore cookies and local storage data as needed.
// so if I have 30 tests, why I have to login 30 times, so I can login once and store the cookies and local storage data and use it in other tests.

// test.beforeEach(async ({ page }) => {
//     // Perform login actions here
//     await page.goto('https://rahulshettyacademy.com/client');
//     await page.fill('#userEmail', '

// test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     // Perform login actions here
//     await page.goto('https://rahulshettyacademy.com/client');
//     await page.fill('#userEmail', '

// test.afterAll(async ({ browser }) => {
//     // Clean up actions if needed
// });

// test.afterEach(async ({ page }) => {
//     // Clean up actions if needed
// });


// to do API testing in playwright, we can use the request object provided by playwright test runner
// import request from '@playwright/test';


const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};

let token

test.beforeAll(async ()=> {
    // in this we can set baseURL, extra headers, auth etc // this will create a new request context for all the tests
    // we can use this request context to make API calls in our tests
    // we can also create multiple request contexts with different configurations if needed
    // this is useful when we want to test different environments or different user roles
    // we can also use this request context to set up common headers or auth tokens for all the tests
    // this will help us to avoid code duplication and make our tests more maintainable
    // we can also use this request context to set up common headers or auth tokens for all the tests
    // this will help us to avoid code duplication and make our tests more maintainable


    const apiContext = await request.newContext();
    // Make a POST request to the login endpoint// now we do not have pageContext here instead we are making API calls directly
    // Login call POST Method
    //post(url,payload/options) after url any data,headers etc can be passed as options with key value pairs and curly braces
    // apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    //     data: {
    //         userEmail: "anshika@gmail.com",
    //         userPassword: "Iamking@000"
    //     }
    // });
    // store response if needed in a variable
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data:loginPayload});
    // assert response status // response.ok() checks if the status code is in the range 200-299
    expect(response.ok()).toBeTruthy(); // this returns boolean and not promise so no await needed here
    // Now we have grab the josn response and extract the token from it
    const jsonResponse = await response.json();
    // extract token
    token = jsonResponse.token; // this returns boolean and not promise so no await needed here
    console.log(`Token generated before all tests: ${token}`);
    // USE await only when we are making API calls or performing actions that return a promise, but for extracting values from the response we do not need await as it is not a promise
    // use await on playwright methods
});

test('Get User Details API Test', async ({page}) => {
    // we can create a new request context here or use the one created in beforeAll
    console.log('Starting Get User Details API Test');

    // Pass the token to local storage
    // By default, each request context is isolated and does not share cookies or local storage with other contexts.
    // So, if you want to use the token obtained from the login API in subsequent API calls, you need to manually set it in the local storage of the new request context.
    // This is important because the server may require the token to be present in the local storage for authentication and authorization purposes.
    // If you do not set the token in the local storage, the subsequent API calls may fail with unauthorized errors.
    // So, to ensure that the token is available for subsequent API calls, we need to set it in the local storage of the new request context.
    // By default playwright does not provide a direct method to set local storage in the request context.
    // we can use JavaScript to set the local storage in the browser context and then use that context to make API calls.

    // the method is page.addInitScript() can be used to set local storage before any page loads in the context.
    // But here we do not have page context, so we can create a temporary page to set local storage and then close the page.
    // So create a page Context in test fixture
    // this will take 2 parameters, first is a function that will be executed in the browser context, second is the arguments to be passed to that function
    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client'); // navigate to any page to initialize the local storage
    // Now it directly logged in to the client app as token is already set in local storage
    // in some apps token is set in cookies, so we can set cookies using page.context().addCookies() method

    // Now we can make an authenticated API call to get user details
    // const apiContext = await request.newContext({
    //     // set extra headers if needed
    //     extraHTTPHeaders: {
    //         'Authorization': `Bearer ${token}` // set the token in the Authorization header
    //     }
    // });

    // In some apps it will be in session storage instead of local storage
    // we can set session storage using page.evaluate() method
    // await page.evaluate((value) => {
    //     window.sessionStorage.setItem('token', value);
    // }, token);

    // Verify if order created is showing in history page
    // Precondition: Order is created using API call or UI

    // create order API call
    // here how do we know which user is creating the order, so we need to pass the token in the header to identify the user
    // we can also pass the token in the body of the request if the API supports it, but it is more common to pass it in the header
    // we can also use environment variables to store the token and use it in the tests, but for simplicity we are using a variable here
    const apiContext = await request.newContext();
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: {
            "orders":[{"country":"Cuba","productOrderedId":"696886c0c941646b7a9a3b53"}]
        },             // FOR JS OBJECTS KEY no need of quotes

        headers : { 
            "Authorization" : token,
            "Content-Type": "application/json"
        }
    })
    expect(orderResponse.ok()).toBeTruthy();
    const orderJsonResponse = await orderResponse.json();
    const orderId = orderJsonResponse.orders[0];
    console.log(`Order ID: ${orderId}`);
    const message = orderJsonResponse.message;
    expect(message).toBe("Order Placed Successfully");
    const myOrders = page.locator('button[routerlink*="myorders"]')
    await myOrders.click()
    const row = page.locator('tbody tr')
    await page.locator('tbody').waitFor()
    const rowCount = await row.count()

    for (let i=0; i<rowCount; i++){
        const rowOrderId = await row.nth(i).locator('th').textContent()
        if(orderId.includes(rowOrderId)){
            await row.nth(i).locator('.btn').first().click();
            break;
        }
    }
    const orderIdd = await page.locator('.col-text ').textContent()
    //expect(orderId).toBe(orderIdd)
    expect(orderIdd.includes(orderId)).toBeTruthy()
})