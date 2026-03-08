# Cucumber
- https://cucumber.io/docs
- its the same code that will be executed but we run a file which is written in english i.e Gherkins ie. feature file and executes step file 

- configuring cucumber
- install cucumber -> ```npm install --save-dev @cucumber/cucumber``` -> this comes as a node module
- install cucumber extension in VScode -> Alexander Krechik
- feature is like testsuite, where it can have many testcases ie scenarios in feautre file
- Given,When,Then are test steps
- create a features folder at project level
- create a feature file ECommerce.feature
- after creating a feature file we have to create corresponding step definition file
- to create a step file first run feature even though step file is not ready it will give errors and then we can do it properly 
- ```npx cucumber-js``` This will search for feature folder in that a feature file and then execute it
- ``` Error when feature file is executed 
 npx cucumber-js
UUUUU

Failures:

1) Scenario: Placing the order # features\ECommerce.feature:3
   ? Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
       Undefined. Implement with the following snippet:
       
         Given('a login to Ecommerce application with {string} and {string}', function (string, string2) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When Add "Zara Coat 3" item to cart
       Undefined. Implement with the following snippet:

         When('Add {string} item to cart', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then Verify "Zara Coat 3" is displayed in the Cart
       Undefined. Implement with the following snippet:

         Then('Verify {string} is displayed in the Cart', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When Enter valid details and Place the order
       Undefined. Implement with the following snippet:

         When('Enter valid details and Place the order', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then Verify order present in OrderhistoryPage
       Undefined. Implement with the following snippet:

         Then('Verify order present in OrderhistoryPage', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


1 scenario (1 undefined)
5 steps (5 undefined)
0m00.008s (executing steps: 0m00.000s)
```
- Now inside features folder create step_definitions/support folder and write a steps.js file
- import Given When Then and create a steps.js structure
- Now write actual code
- Now excute feature file 
- Hooks in cucumber -> create a support folder in features and write hook in this
- Tags in cucumber -> add tags in feature file right below Feature -> ```npx cucumber-js --tags "@Regression"```
- Integrate tags and hooks -> ```Before({tags:@tagName},async function() { })``` -> before will run only with tags that have @tagName , 
- ```Before({tags:@tagName or @tagName},async function() { })``` -> run this if Scenario has any one of these
- ```Before({tags:@tagName and @tagName},async function() { })``` -> run this if Scenario has both

- Parallel Executions -> Cucumber can only run scenarios in parallel not feature files that is the limitation of cucumber
- We can have n number of scenarios in one feature file and those scenarios in a feature file can run parallely
- To run paralley -> ``` npx cucumber-js features/Ecommerce.feature --parallel 10``` -> 10 scenarios run in parallel
- Generate HTML Report -> ```npx cucumber-js features/Ecommerce.feature --parallel 10 --exit --format html:cucumber-report.html ``` for Json report ````npx cucumber-js features/Ecommerce.feature --parallel 10 --exit --format json:cucumber-report.json```
- Re-Run failed tests -> ```npx cucumber-js features/Ecommerce.feature --parallel 10 --exit --retry 1 --format html:cucumber-report.html ```
- in package.json we can add scripts -> Ex: ```"cucmberRegression": "npx cucumber-js --tags '@Regression'"
 ```