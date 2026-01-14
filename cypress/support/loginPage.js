// Page object yang berisi aksi dan selector
class LoginPage {
  visit() {
    cy.visit('https://www.saucedemo.com/')
  }

  inputUsername(username) {
    cy.get('[data-test="username"]')
      .should('be.visible')
      .clear()
      .type(username)
  }

  inputPassword(password) {
    cy.get('[data-test="password"]')
      .should('be.visible')
      .clear()
      .type(password)
  }

    loginButton() {
    cy.get('[data-test="login-button"]').click()
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/inventory')
  }

  verifyLoginFailed() {
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match')
  }
}

export default new LoginPage()
