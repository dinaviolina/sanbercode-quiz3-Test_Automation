import loginPage from "../support/loginPage"
import loginData from "../fixtures/loginData.json"

describe('Scenario Verifikasi', () => {
    it('Login dengan username password valid', ()=>{
        // cy.visit('https://www.saucedemo.com/')
         // cy.get('[data-test="username"]').type('standard').should('have.value','standard_user')
        // cy.get('#password').type('secret_sauce')
        // cy.get('#login-button').click()
        // cy.url().should('include', 'inventory')
        loginPage.visit()
        loginPage.inputUsername(loginData.validUsername)
        loginPage.inputPassword(loginData.validPassword)
        loginPage.loginButton()
        loginPage.verifyLoginSuccess()
        
    })
    it('Login dengan username invalid password invalid', ()=>{

        loginPage.visit()
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()
        loginPage.verifyLoginFailed()
    })
})