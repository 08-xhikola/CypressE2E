class ShoppingCartPage {
  getShoppingCartMenu() {
    return cy.get("#topcartlink");
  }

  getGoToCartBtn() {
    return cy.get(".button-1.cart-button");
  }

  getUpdateShoppingCartBtn() {
    return cy.get("#updatecart");
  }

  getContinueShoppingBtn() {
    return cy.get("button[name='continueshopping']");
  }

  getEstimateShippingBtn() {
    return cy.get("#open-estimate-shipping-popup");
  }

  getItemsPrice() {
    return cy.get(".product-subtotal");
  }

  getTotalPriceAmount() {
    return cy.get(".value-summary > strong");
  }
  getRemoveItemFromCartBtn() {
    return cy.get("button.remove-btn");
  }
}

export default ShoppingCartPage;
