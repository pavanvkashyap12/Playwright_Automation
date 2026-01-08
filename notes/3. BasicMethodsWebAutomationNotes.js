// LOCATORS STRATEGIES IN PLAYWRIGHT

// https://playwright.dev/docs/locators

// https://rahulshettyacademy.com/loginpagePractise/
// Playwright supports CSS and XPath selectors natively. You can also use text selectors and other strategies.
// but xpath is not recommended way in playwright

// Syntax page.locator('selector')
// id -> tagname#id or #id
// class -> tagname.classname or .classname
// attribute -> tagname[attribute='value'] or [attribute='value']
// Write CSS with traversing from Parent to Child parenttagname >> childtagname example: div >> input[name='username']
// text -> text='exact text' or text=partial text
// combination -> tagname.classname#id[attribute='value']


// multiple attributes -> tagname[attribute1='value'][attribute2='value']
// child -> parentSelector > childSelector
// descendant -> parentSelector childSelector
// sibling -> siblingSelector >> nth=index
// xpath -> xpath=your_xpath_expression


// for traversing from Child to Parent use locator.locator('..')
// example: page.locator("input[name='username']").locator('..')
// for multiple locators use locator.nth(index)
// example: page.locator("input[type='text']").nth(0)  -> first textbox
// example: page.locator("input[type='text']").nth(1)  -> second textbox


// fill() -> to enter text in input fields
// click() -> to click on buttons, links, checkboxes, radio buttons
// check() -> to check a checkbox
// uncheck() -> to uncheck a checkbox
// selectOption() -> to select an option from a dropdown
// textContent() -> to get the text content of an element
// innerText() -> to get the inner text of an element
// getAttribute() -> to get the value of an attribute of an element
// isVisible() -> to check if an element is visible on the page
// isEnabled() -> to check if an element is enabled
// isChecked() -> to check if a checkbox or radio button is checked

// expect(locator).toHaveText(expectedText) -> to assert that an element has the expected text
// expect(locator).toHaveText(/partial text/) -> to assert that an element contains the expected partial text
// expect(locator).toHaveValue(expectedValue) -> to assert that an input field has the expected value
// expect(locator).toHaveValue(/partial value/) -> to assert that an input field contains the expected partial value
// expect(locator).toContainText(expectedText) -> to assert that an element contains the expected text
// expect(locator).toContainText(/partial text/) -> to assert that an element contains the expected partial text
// expect(locator).toContain(expectedValue) -> to assert that an input field contains the expected value
// expect(locator).toContain(/partial value/) -> to assert that an input field contains the expected partial value
// expect(locator).toHaveAttribute(attributeName, expectedValue) -> to assert that an element has the expected attribute value
// expect(locator).toBeVisible() -> to assert that an element is visible
// expect(locator).toBeEnabled() -> to assert that an element is enabled
// expect(locator).toBeChecked() -> to assert that a checkbox or radio button is checked

// toContain is used on Strings and Arrays , toContainText is used on Locators

// Erase text from input fields
// Use fill('') to clear the text from an input field
// Example: await page.locator("#username").fill('');

// Multiple Elements Locators [its is keeping it in an array like structure]
// When dealing with multiple elements, Playwright provides several methods to interact with them:
// locator.count() -> returns the number of elements matching the locator
// locator.nth(index) -> returns the element at the specified index
// locator.first() -> returns the first element matching the locator
// locator.last() -> returns the last element matching the locator
// locator.allTextContents() -> returns an array of text contents of all elements matching the locator

// Static Dropdowns
// Use locator.selectOption('value') to select an option from a static dropdown
// Example:
// await page.locator("#staticDropdown").selectOption("option2");
// You can also select by label or index
// await page.locator("#staticDropdown").selectOption({ label: "Option 2" });
// await page.locator("#staticDropdown").selectOption({ index: 1 });
// Note: Static dropdowns are implemented using the <select> HTML tag

// Working with Dynamic Dropdowns
// Use locator.click() to open the dropdown
// Use locator.locator('optionSelector').click() to select an option from the dropdown
// Example:
// await page.locator("#dropdownMenu").click();
// await page.locator("text=Option 2").click();

// Handling Checkboxes and Radio Buttons
// Use locator.check() to check a checkbox
// Use locator.uncheck() to uncheck a checkbox
// Use locator.isChecked() to verify if a checkbox is checked
// Example:
// await page.locator("#agreeTerms").check();
// expect(await page.locator("#agreeTerms").isChecked()).toBe(true);

// Working with Alerts and Pop-ups
// Use page.on('dialog', async dialog => { ... }) to handle alerts, confirms, and prompts
// Example:
// page.on('dialog', async dialog => {
//     console.log(dialog.message());
//     await dialog.accept();
// });
// await page.locator("#triggerAlert").click(); 


// Techniques to wait dynamically for new page in Service Based Apps-clientapp.spec.js
// waitForLoadState('networkidle') wait untill all network calls are finished
// loadState can be 'load' (default) - wait for load event, 'domcontentloaded' - wait for DOMContentLoaded event, 'networkidle' - wait until there are no network connections for at least 500 ms
// waitForResponse(url or predicate) wait for specific API call to complete
// waitForSelector(selector) wait for specific element to appear in DOM
// expect(locator).toBeVisible() wait for specific element to be visible on the page

// Note: Avoid using hard waits like page.waitForTimeout(5000) as it slows down the tests and is not reliable. Use dynamic waits instead.

// Reference Links:
// https://playwright.dev/docs/locators
// https://playwright.dev/docs/api/class-locator
// https://playwright.dev/docs/actionability
// https://playwright.dev/docs/wait-for#waiting-for-network-idle
// https://playwright.dev/docs/api/class-page#page-wait-for-response


//      await expect(adminRadio).toBeChecked(); 
//                    V/S
//     expect(await terms.isChecked()).toBeFalsy();
// await is needed only when action is performed
// await expect(adminRadio).toBeChecked();  In this action is performed outside expect hence await is needed outside
// expect(await terms.isChecked()).toBeFalsy(); Here action is performed inside expect hence await is needed inside
