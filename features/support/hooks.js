import { Before, BeforeStep,After,AfterStep,Status } from "@cucumber/cucumber";
import { PageObjectsManager } from '../../pageObjects/PageObjectsManager.js'
import { expect, chromium } from '@playwright/test';


Before( async function () {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    //const page = await context.newPage(); // not attached to world constructor
    this.page = await context.newPage(); // attached to world constructor
    this.pageObjectsManager = new PageObjectsManager(this.page);
    // here this.pageObjectsManager is attached to world constructor hence it is available even in steps.js
    // bu page is initialzed in Before but for that to be sent in steps.js attach it to world constructor
})

BeforeStep(function() { // executes before each step that is GIVEN,WHEN,THEN
    // can be used to take a screenshot
    console.log('Before Step')
})

After(function() {
    // playwright automtically closes the browser
    console.log('I am last to execute')
})

AfterStep(async function({results}) { // executes after each step that is GIVEN,WHEN,THEN
    console.log('Before Step')
    // here step result can be captured , the result of the step will be automatically sent to AfterStep
    // can be used to take a screenshot this is best place to take Screenshot bcoz if step fails then it will come to after step and takes screenshot
    if(results.status===Status.FAILED) {
        await this.page.screenshot() // no path
        await this.page.screenshot({path: 'screenshot1.png'}) //creates a SS with name screenshot1.png in root folder
    }
})

//BeforeAll() -> runs before all scenarios
// Before() -> runs before each scenario