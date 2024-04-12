import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ShoppingCartPage from "../pages/ShoppingCart";
import EstimateShippingPage from "../pages/EstimateShipping";

const registerPage = new RegisterPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const shoppingCart = new ShoppingCartPage();
const estimateShipping = new EstimateShippingPage();

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
    expect(response.status).to.equal(200);
  });
});

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
    expect(response.status).to.equal(302);
  });
});

Cypress.Commands.add("verifyElementsLength", (results) => {
  dashboardPage.getItemsAppearingResults().should("have.length", results);
  cy.wait(4000);
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

Cypress.Commands.add("verifyShoppingCartItemCount", () => {
  shoppingCart.getShoppingCartMenu().should("be.visible");
  shoppingCart.getShoppingCartMenu().trigger("mouseover");

  cy.wait(2000);

  dashboardPage
    .getCartNm()
    .invoke("text")
    .then((actualItemCount) => {
      const actualItemCountNumber = parseInt(
        actualItemCount.match(/\d+/)[0],
        10
      );

      dashboardPage.getAddToCartItemsList().then(($quantitySpans) => {
        let sumOfQuantities = 0;
        $quantitySpans.each((index, element) => {
          const quantity = parseInt(element.textContent.trim(), 10);
          sumOfQuantities += quantity;
        });
        expect(sumOfQuantities).to.equal(actualItemCountNumber);
      });
    });
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
  cy.get(".product-subtotal").then(($items) => {
    let totalPrice = 0;

    $items.each((index, item) => {
      const priceText = Cypress.$(item).text();
      const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
      totalPrice += price;
    });

    cy.get(".value-summary > strong").then(($total) => {
      const totalText = $total.text();
      const total = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
      expect(totalPrice).to.equal(total);
    });
  });
});

Cypress.Commands.add("fillAddressFieldsAndApply", () => {
  estimateShipping.getCountrySelect().select("Albania");
  cy.fixture("credentials").then((data) => {
    const postalCode = data.postalCode;
    estimateShipping.getZipCodeField().type(postalCode).blur();
  });
  cy.wait(4000);
  estimateShipping.getApplyBtn().click({ force: true });
});

Cypress.Commands.add("removeAllItemsFromCart", () => {
  function removeItemsFromCart() {
    shoppingCart.getRemoveItemFromCartBtn().then(($btn) => {
      if ($btn.length > 0) {
        cy.log("Removing item from the cart");
        cy.wrap($btn).click({ force: true, multiple: true });
        estimateShipping.getNoDataMsg().then(($noDataMsg) => {
          if ($noDataMsg.is(":visible")) {
            cy.log("No more items in the cart");
            return;
          } else {
            removeItemsFromCart();
          }
        });
      } else {
        cy.log("No more items to remove from the cart");
      }
    });
  }

  removeItemsFromCart();
});

Cypress.Commands.add("addToCartAndVerify", () => {
  dashboardPage.getItemDetailsAddToWishlist().click();

  cy.request({
    method: "POST",
    url: "https://demo.nopcommerce.com/addproducttocart/details/*",
    followRedirect: false,
  }).then((response) => {
    expect(response.status).to.equal(302);
  });
});
