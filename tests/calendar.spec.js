import {test,expect} from '@playwright/test'

test('Calendar Test',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const month = '6'
    const date = '30'
    const year = '2027'
    const expectedList = [month,date,year]

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    // choose year
    await page.getByText(year).click();

    // choose month here we have 6 and months are in text in application so we need to map it
    // get a common locator for months
    // in application months start from 0 index hence do -1 Here 5 is 
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month) - 1).click();
    // choose date
    await page.locator('//abbr[text()="'+ date +'"]').click();
    const values = page.locator('.react-date-picker__inputGroup__input');
    for (let i=0;i<expectedList.length;i++){ // we can use inputValue() or getAttribute('value')
        const value = await values.nth(i).inputValue(); // here we are performing action hence await
        expect(value).toEqual(expectedList[i]);
    }

})