const base = require("@playwright/test"); // we are importing the default test object from playwright test, so that we can extend it and add our custom properties in it, so that we can use those properties in our test cases by importing this file
// here base is default object which we are exporting and we can add our custom properties in it, so that we can use those properties in our test cases by importing this file
exports.customTest = base.test.extend({
    // page,browser,context are default fixture

    testDataForOrder : { // as this is a JSON object, no need "" for key
        "username": "anshika@gmail.com",
        "password": "Iamking@000",
        "productName": "ZARA COAT 4"
    }
    // now in test case we can use this testDataForOrder fixture by importing this file and using it as a parameter in our test case, so that we can access the test data in our test case without importing the JSON file directly in our test case, this way we can keep our test data separate from our test cases and also we can use the same test data in multiple test cases without importing the JSON file multiple times.
    // instead of test you custom test
});

