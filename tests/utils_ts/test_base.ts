import { test as baseTest} from '@playwright/test'
// Here test has a reference name called BaseTest

interface TestDataForOrder {
    username : string,
    password : string,
    productName : string
}
// Here we are extending our baseTest with these values
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    // page,browser,context are default fixture
    // hover over extend it will give suggestion to create an interface

    testDataForOrder : { // as this is a JSON object, no need "" for key
        "username": "anshika@gmail.com",
        "password": "Iamking@000",
        "productName": "ZARA COAT 4"
    }
    // now in test case we can use this testDataForOrder fixture by importing this file and using it as a parameter in our test case, so that we can access the test data in our test case without importing the JSON file directly in our test case, this way we can keep our test data separate from our test cases and also we can use the same test data in multiple test cases without importing the JSON file multiple times.
    // instead of test you custom test
});

