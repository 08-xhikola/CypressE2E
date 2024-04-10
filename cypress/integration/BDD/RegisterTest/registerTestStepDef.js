/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
require("cypress-mochawesome-reporter/register");

import RegisterPage from "../../../pages/RegisterPage";
import LoginPage from "../../../pages/LoginPage";
import DashboardPage from "../../../pages/DashboardPage";
import ShoppingCartPage from "../../../pages/ShoppingCart";

const registerPage = new RegisterPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const shoppingCart = new ShoppingCartPage();

Given("I navigate to the website", () => {
  cy.visit(Cypress.env("url"));
});

When("I click on the login menu", () => {
  registerPage.getLoginMenu().should("exist").click();
});

Then("I check fields to be mandatory", () => {
  registerPage.getRegisterConfirmBtn().click();
  registerPage.getFieldsValidationError().should("be.visible");
});

When("I click on the register button", () => {
  registerPage.getFirstRegisterButton().should("be.enabled").click();
});

Then("I verify the title of the registration page", () => {
  cy.verifyPageTitle("Register");
});

Then("I fill the registration form", () => {
  cy.registerForm();
});

Then("I verify that registration is successful", () => {
  registerPage
    .getRegistrationCompletedMsg()
    .should("exist")
    .invoke("text")
    .should("contain", "registration completed");
});

Then("the Register response should be successful", () => {
  cy.registerStatus();
});

When("I log in with valid credentials", () => {
  cy.loginFlow();
});

Then('I should see the "Welcome to our store" text', () => {
  loginPage
    .getWelcomeText()
    .should("exist")
    .invoke("text")
    .should("contain", "Welcome");
});

Then('I should see the "Log out" menu', () => {
  loginPage.getLogOutTab().should("exist");
});

When("I log out", () => {
  loginPage.getLogOutTab().click();
});

Then("I should be logged out successfully", () => {
  cy.logout();
});

When("I hover over the Computers Menu", () => {
  dashboardPage.getComputersTab().first().trigger("mouseover");
  cy.wait(3000);
});

When("I click on Notebooks", () => {
  dashboardPage.getNotebooks().first().click({ force: true });
});

Then("I verify that I have navigated to the Notebooks Page", () => {
  cy.url().should("include", "/notebooks");
});

When('I choose "9" on Display dropdown', () => {
  dashboardPage.getDisplay().select("9");
});

Then("I verify that only 6 items are displayed", () => {
  cy.verifyElementsLength(6);
});

Then('I check "16 GB" on Filter by attributes', () => {
  cy.checkCheckboxByLabel("16 GB");
});

Then("I verify that only 1 item is displayed", () => {
  cy.verifyElementsLength(1);
});

Then('I uncheck the "16 GB" checkbox', () => {
  cy.uncheckCheckboxByLabel("16 GB");
});

Then("I verify that 6 items are displayed now", () => {
  cy.verifyElementsLength(6);
});

When("I add the second and the third item on wishlist", () => {
  dashboardPage.getAddToWishList().eq(1).click();
  cy.wait(3000);
  dashboardPage.getAddToWishList().eq(2).click();
});

Then(
  'I verify that after every item added a notification with text: "The product has been added to your wishlist" is displayed',
  () => {
    cy.checkTextToastify("has been added to your wishlist");
  }
);

When("I click on the fourth product", () => {
  dashboardPage.getItemsAppearingResults().eq(3).click();
});

Then("I verify that the detail page for this item is open", () => {
  cy.checkUrlAndHeaderText();
});

Then("I go back to the Notebooks Page", () => {
  cy.go(-1);
  cy.url().should("include", "/notebooks");
});

Then("I add the fifth and sixth item on Shopping Cart", () => {
  dashboardPage.getAddToCartBtn().eq(4).click();
  cy.wait(4000);
  dashboardPage.getAddToCartBtn().eq(5).click();
  cy.wait(3000);
});

Then(
  'I verify that for the two last items added a notification with text: "The product has been added to your shopping cart" is displayed',
  () => {
    cy.checkTextToastify("has been added to your shopping cart");
  }
);

Then("Wishlist on Menu bar displays 2", () => {
  cy.wait(2000);
  dashboardPage.getWishListNm().should("contain", "2");
});

Then("Shopping Cart on Menu bar displays 2", () => {
  cy.wait(2000);
  dashboardPage.getCartNm().should("contain", "2");
});

When("I hover over the Shopping Cart Menu", () => {
  cy.wait(3000);
  shoppingCart.getShoppingCartMenu().trigger("mouseover");
});

Then("I verify that the 'Go To Cart' button is displayed", () => {
  shoppingCart.getGoToCartBtn().should("be.visible");
});

When("I click the 'Go To Cart' button", () => {
  shoppingCart.getGoToCartBtn().click();
});

Then("I verify that I have navigated to the Shopping Cart Page", () => {
  cy.url().should("include", "/cart");
});

Then("I verify that the following buttons are displayed:", (dataTable) => {
  const buttonNames = dataTable.rawTable.map((row) => row[0]);
  cy.verifyDisplayedButtons(buttonNames);
});
Then(
  "I verify that the prices sum for all items is equal to Total Price at the end of the page, and the price color is blue",
  () => {
    cy.verifyTotalPrice();
  }
);
