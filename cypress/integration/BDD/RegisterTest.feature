Feature: User Registration
    As a new user
    I want to register on the website
    So that I can access the features

    Background:
        Given I navigate to the website
        When I click on the login menu
        And I log in with valid credentials


    Scenario: End to End User Registration Flow
        When I click on the login menu
        Then I click on the register button
        And I check fields to be mandatory
        Then I verify the title of the registration page
        And I fill the registration form
        Then I verify that registration is successful
        Then the Register response should be successful

    Scenario: End to End Login Flow
        Then I should see the "Welcome to our store" text
        And I should see the "Log out" menu
        When I log out
        Then I should be logged out successfully

    Scenario: End to End Dashboard Flow
        When I hover over the Computers Menu
        And I click on Notebooks
        Then I verify that I have navigated to the Notebooks Page
        When I choose "9" on Display dropdown
        Then I verify that only 6 items are displayed
        And I check "16 GB" on Filter by attributes
        Then I verify that only 1 item is displayed
        And I uncheck the "16 GB" checkbox
        Then I verify that 6 items are displayed now
        When I add the second and the third item on wishlist
        Then I verify that after every item added a notification with text: "The product has been added to your wishlist" is displayed
        When I click on the fourth product
        Then I verify that the detail page for this item is open
        And I go back to the Notebooks Page
        And I add the fifth and sixth item on Shopping Cart
        Then I verify that for the two last items added a notification with text: "The product has been added to your shopping cart" is displayed
        And Wishlist on Menu bar displays 2
        And Shopping Cart on Menu bar displays 2

    Scenario: End to End Shopping Cart Page
        When I hover over the Shopping Cart Menu
        Then I verify that the 'Go To Cart' button is displayed
        When I click the 'Go To Cart' button
        Then I verify that I have navigated to the Shopping Cart Page
        And I verify that the following buttons are displayed:
            | Update Cart       |
            | Continue Shopping |
            | Estimate Shipping |
        And I verify that the prices sum for all items is equal to Total Price at the end of the page, and the price color is blue

    Scenario: Empty Shopping Cart
        When I hover over the Shopping Cart Menu
        When I click the 'Go To Cart' button
        When the first item is deleted from the shopping cart
        Then verify that the number of elements in Shopping Cart table is decreased by 1
        When the Estimate Shopping button is clicked
        And country, state, and postal code fields are filled and Apply button is clicked
        Then verify that the number of elements in Shopping Cart table is decreased by 1
        And repeat the steps until the last item is deleted
        Then verify that Shopping Cart is empty
