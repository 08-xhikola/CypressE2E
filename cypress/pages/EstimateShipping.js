class EstimateShippingPage {
  getCountrySelect() {
    return cy.get("#CountryId");
  }

  getZipCodeField() {
    return cy.get("#ZipPostalCode");
  }

  getApplyBtn() {
    return cy.get("button[class='button-2 apply-shipping-button']");
  }

  getNoDataMsg() {
    return cy.get(".no-data");
  }
}

export default EstimateShippingPage;
