Feature: Error validations
    @Validations
    # Scenario: Placing the order
    #     Given a login to Ecommerce2 application with "anshika@gmail.com" and "Iamking@000"  
    #     Then Verify error message is displayed

    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"  
        Then Verify error message is displayed

        Examples:
            | username          |  password    |
            | anshika@gmail.com | Iamking@000  |
            | hello@123.com     | test         | 
            # test will run 2 times that is there are 2 rows
            # Scenario ouline will first check for rows and replaces it at runtime


        # To run sepecific feature file npx cucumber-js features/ErrorValidations.feature
        # To run sepecific tag npx cucumber-js --tags "@tagName"

        # If you want to parameterize test with different data use Scenario Outline instead of Scenario
