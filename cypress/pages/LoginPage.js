class LoginPage {
  getEmailField() {
    return cy.get("#Email");
  }
  getPasswordField() {
    return cy.get("#Password");
  }
  getRememberBtn() {
    return cy.get("#RememberMe");
  }
  getLogInBtn() {
    return cy.get(".button-1.login-button");
  }
  getWelcomeText() {
    return cy.get("div[class='topic-block-title'] h2");
  }
  getLogOutTab() {
    return cy.get(".ico-logout");
  }
}
export default LoginPage;
