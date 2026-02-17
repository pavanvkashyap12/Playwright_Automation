import { test, request, expect } from '@playwright/test'
import APIUtils from './utils/APIUtils.js';

// ABORT CALLS
// Scenario: server is down
// network call means not only fetch/xhr in network tab
// example once we open website there are CSS files, if we want to stop that css we can abort it

test('Abort Network Call', async ({ page }) => {
    page.on('request',request=> console.log(request.url()))
    page.on('response',response=> console.log(response.url(), response.status()))
    await page.route('**/*.css', // any CSS file // multiple extension in an array '**/*.{jpg,png,jpeg}
        async route => await route.abort()
    )
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.pause()
})

// NOTE : Playwright tracks all the network calls(ie. requests) that is happening in browser
// we can print those requests calls and response calls in output also 
// we can see print statements and check which call failed using status code
// to register to playwright to capture all class we need a listner
// i.e page.on('request',request=> console.log(reqquest.url())) whenever request call is made action will be executed
