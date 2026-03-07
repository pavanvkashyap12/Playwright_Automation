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