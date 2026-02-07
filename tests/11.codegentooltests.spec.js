import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.getByRole('link').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 1 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('india');
  await page.getByText('India').click();
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await expect(page.getByText('I agree with the term &')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - navigation:
      - link "ProtoCommerce":
        - /url: "#"
      - list:
        - listitem:
          - link "Home":
            - /url: /angularpractice
        - listitem:
          - link "Shop":
            - /url: /angularpractice/shop
    - navigation:
      - link "ProtoCommerce Home":
        - /url: "#"
      - list:
        - listitem: Checkout ( 1 ) (current)
    - text: Please choose your delivery location. Then click on purchase button
    - textbox "Please choose your delivery location. Then click on purchase button"
    - checkbox "I agree with the term & Conditions " [checked]
    - text: I agree with the term & Conditions 
    - button "Purchase"
    - link "close":
      - /url: "#"
      - text: ""
    - strong: Success!
    - text: Thank you! Your order will be delivered in next few weeks :-).
    - contentinfo:
      - paragraph: /Copyright © ProtoCommerce \\d+/
    `);
});