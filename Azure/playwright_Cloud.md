Run Playwright Tests In Parallel On Azure Cloud-Hosted Browsers With CI/CD Integration
- Cloud Hosted Browsers Free
- CI/CD Integration Paid
- Azure is best for playwright because both are microsoft
- https://portal.azure.com/ -> login
- create a resource -> playwright -> Microsoft Playwright Testing (preview/classic) -> create
- This appears Create a Playwright Testing (Preview) Workspace
- Now we have to create a workspace so that we can deploy this workspace where all our code base is there
- resource group : multiple workspaces in this 
- instance details and create 

# How to Run Playwright tests on Azure
- sign in playwright portal with azure account -> playwright.microsoft.com with same azure account
- click on new workspace -> you can see the workspace that you have created in azure -> just click on it
- Here where it will give all steps to run playwright test in cloud
- ``` npm init @azure/microsoft-playwright-testing```
- once installed we can see this package details in package.json dev dependencies
- also created a playwright.service.config.js -> this is like heart of the framework
- to run tests we have to point our tests to playwright.service.config.js
- now to run in azure cloud we need to login with our account -> https://playwright.microsoft.com/
- For this we need to install azure CLI
- then terminal ```az login``` which will redirect to browser and once you login we can see it is authenticated
- select a subscription and tenant 
- Now our local can to talk to azure cloud 
- Now tell playwright which region 
- ``` Add region endpoint in your setup 
      run this command in terminal window to setup the workspace home location end point to request browsers
      export PLAYWRIGHT_SERVICE_URL= wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_a6043668b-04fa/browsers
      our framework will look for this url this is inside the package that we downloaded above and then tests will point that endpoint
      In termial add this 
      ```
- Now go ahead and run tests ``` npx playwright test --config=playwright.config.js/ts --workers=20```
- Now we can message Running tests using Microsoft Playwright Testing Service and also report will be created
- Now go to playwright.microsoft.com -> home -> go to workspace -> we can see results
- Failed tests have all things that we have in local like SS,video,traces -> click on view tracer to see all videos