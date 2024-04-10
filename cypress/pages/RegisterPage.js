class RegisterPage {
  getLoginMenu() {
    return cy.get(".ico-login");
  }

  getFirstRegisterButton() {
    return cy.get(".button-1.register-button");
  }

  getPageTitleHeader() {
    return cy.get("div[class='page-title'] h1");
  }

  getGenderRadioButton() {
    return cy.get("label[class='forcheckbox']");
  }

  getFirstNameField() {
    return cy.get("#FirstName");
  }

  getLastNameField() {
    return cy.get("#LastName");
  }

  getBirthDayDropdown() {
    return cy.get("select[name='DateOfBirthDay']");
  }

  getBirthMonthDropdown() {
    return cy.get("select[name='DateOfBirthMonth']");
  }

  getBirthYearDropdown() {
    return cy.get("select[name='DateOfBirthYear']");
  }

  getEmailField() {
    return cy.get("#Email");
  }

  getCompanyField() {
    return cy.get("#Company");
  }

  getOptionInputNewsletter() {
    return cy.get("#Newsletter");
  }

  getPasswordField() {
    return cy.get("#Password");
  }

  getPasswordConfirmField() {
    return cy.get("#ConfirmPassword");
  }

  getRegisterConfirmBtn() {
    return cy.get("#register-button");
  }

  getFieldsValidationError() {
    return cy.get(".field-validation-error");
  }

  getRegistrationCompletedMsg() {
    return cy.get(".result");
  }
}

export default RegisterPage;
