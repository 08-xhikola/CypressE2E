class DashboardPage {
  getComputersTab() {
    return cy.get('a[href$="/computers"]');
  }

  getNotebooks() {
    return cy.get("a[href$='/notebooks']");
  }

  getDisplay() {
    return cy.get("#products-pagesize");
  }

  getMemoryCheckbox() {
    return cy.get('input[type="checkbox"]');
  }

  getItemsAppearingResults() {
    return cy.get("div.product-item");
  }

  getAddToWishList() {
    return cy.get(".add-info .buttons .add-to-wishlist-button");
  }

  getAddToCartBtn() {
    return cy.get(".product-box-add-to-cart-button");
  }

  getToastSuccesfulNotif() {
    return cy.get(".content");
  }

  getCloseToastBtn() {
    return cy.get("span[title='Close']");
  }
  getDetailsPageHeader() {
    return cy.get("h1");
  }

  getWishListNm() {
    return cy.get(".wishlist-qty");
  }
  getCartNm() {
    return cy.get(".cart-qty");
  }

  getItemDetailsAddToWishlist() {
    return cy.get("#add-to-wishlist-button-7");
  }

  getAddToCartItemsList() {
    return cy.get(".product .quantity span");
  }
}
export default DashboardPage;
