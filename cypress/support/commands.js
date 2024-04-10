import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ShoppingCartPage from "../pages/ShoppingCart";
import { recurse } from "cypress-recurse";

const registerPage = new RegisterPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const shoppingCart = new ShoppingCartPage();

Cypress.Commands.add("verifyPageTitle", (expectedTitle) => {
  registerPage.getPageTitleHeader().then(($title) => {
    const titleText = $title.text().trim();
    expect(titleText).to.equal(expectedTitle);
  });
});

Cypress.Commands.add("registerStatus", () => {
  cy.request({
    method: "GET",
    url: "https://demo.nopcommerce.com/registerresult/1?returnUrl=/",
    followRedirect: false,
  }).then((response) => {
    // Verify that the response status code is 200 OK
    expect(response.status).to.equal(200);
  });
});

// Define the makeid function to generate a random email
const makeid = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Generate a random email for both registration and login
const email = makeid() + "@gmail.com";

Cypress.Commands.add("registerForm", () => {
  cy.fixture("credentials").then((data) => {
    const { gender, firstName, lastName, companyName, password } = data;

    if (gender.toLowerCase() === "female") {
      registerPage
        .getGenderRadioButton()
        .filter('[for="gender-female"]')
        .click();
    }

    registerPage.getFirstNameField().type(firstName);
    registerPage.getLastNameField().type(lastName);
    registerPage.getBirthDayDropdown().select(8);
    registerPage.getBirthMonthDropdown().select("September");
    registerPage.getBirthYearDropdown().select("2001");
    // Use the same email for registration
    registerPage.getEmailField().type(email);
    registerPage.getCompanyField().type(companyName);
    registerPage.getOptionInputNewsletter().check();
    registerPage.getPasswordField().type(password);
    registerPage.getPasswordConfirmField().type(password);
    registerPage.getRegisterConfirmBtn().should("be.enabled").click();
  });
});

Cypress.Commands.add("loginFlow", () => {
  cy.fixture("credentials").then((data) => {
    const { password } = data;

    // Use the same email for login
    loginPage.getEmailField().type(email);
    loginPage.getPasswordField().type(password);
    loginPage.getLogInBtn().should("be.enabled").click();
  });
});

Cypress.Commands.add("logout", () => {
  cy.request({
    method: "GET",
    url: "https://demo.nopcommerce.com/logout",
    followRedirect: false,
  }).then((response) => {
    // Verify that the response status code is 302 Found
    expect(response.status).to.equal(302);
  });
});

Cypress.Commands.add("verifyElementsLength", (results) => {
  dashboardPage.getItemsAppearingResults().should("have.length", results);
});

Cypress.Commands.add("checkCheckboxByLabel", (labelText) => {
  cy.contains("label", labelText)
    .siblings(dashboardPage.getMemoryCheckbox())
    .check();
});

Cypress.Commands.add("uncheckCheckboxByLabel", (labelText) => {
  cy.contains("label", labelText)
    .siblings(dashboardPage.getMemoryCheckbox())
    .uncheck();
});

Cypress.Commands.add("checkTextToastify", (text) => {
  dashboardPage.getToastSuccesfulNotif().invoke("text").should("contain", text);
});

Cypress.Commands.add("checkUrlAndHeaderText", () => {
  cy.url().then((url) => {
    const urlParts = url.split("/");
    const currentPage = urlParts[urlParts.length - 1].replace(/-/g, " ");

    dashboardPage
      .getDetailsPageHeader()
      .invoke("text")
      .then((text) => {
        const headerText = text.toLowerCase();
        expect(currentPage).to.include(headerText);
      });
  });
});

Cypress.Commands.add("verifyDisplayedButtons", (buttonNames) => {
  buttonNames.forEach((buttonName) => {
    switch (buttonName) {
      case "Update Cart":
        shoppingCart.getUpdateShoppingCartBtn().should("exist");
        break;
      case "Continue Shopping":
        shoppingCart.getContinueShoppingBtn().should("exist");
        break;
      case "Estimate Shipping":
        shoppingCart.getEstimateShippingBtn().should("exist");
        break;
      default:
        throw new Error(`Unexpected button name: ${buttonName}`);
    }
  });
});

Cypress.Commands.add("verifyTotalPrice", () => {
  // Get all item prices
  cy.get(".product-subtotal").then(($items) => {
    let totalPrice = 0;

    // Loop through each item price and extract the numerical value
    $items.each((index, item) => {
      const priceText = Cypress.$(item).text();
      const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
      totalPrice += price;
    });

    // Get the total amount
    cy.get(".value-summary > strong").then(($total) => {
      const totalText = $total.text();
      const total = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));

      // Assert that the sum of item prices matches the total amount
      expect(totalPrice).to.equal(total);
    });
  });
});
