Feature: Ecommerce validations

    Scenario: Placing the order
        Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000" 
        # "username" and "password" are variables that is used to login 
        When Add "Zara Coat 3" item to cart
        Then Verify "Zara Coat 3" is displayed in the Cart
        When Enter valid details and Place the order
        Then Verify order present in OrderhistoryPage
        # Given is like condition, When is like action performed, Then is the result of the action

# WORLD CONSTRUCTOR
# consider a whole scenario as a world, so variables in Given should be available any of the steps below usually it is called step definition
# so variable should be available for every step as long as it is in same scenario