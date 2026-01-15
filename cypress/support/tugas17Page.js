class Tugas17Page{
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }
    inputUsername(username) {
    cy.get('input[name="username"]')
      .should('be.visible')
      .clear()
      .type(username)
  }
  inputPassword(password) {
    cy.get('input[name="password"]')
      .should('be.visible')
      .clear()
      .type(password)
  }
  loginButton(){
    cy.get('[type="submit"]').click()
  }
  verifyLoginSuccess(){
    cy.url().should('include', '/dashboard/')
  }
  verifyLoginFailed() {
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
    // cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
    // '**/auth/validate'
  }
    verifyLocations() {
    cy.intercept('GET', '**/dashboard/employees/locations').as('Locations')
    cy.wait('@Locations').its('response.statusCode').should('eq', 200)
}

    verifyTimeAtWork() {
        cy.intercept('GET', '**/dashboard/employees/time-at-work*').as('timeAtWork')
        cy.wait('@timeAtWork').its('response.statusCode').should('eq', 200)
    }

    verifyShortcuts() {
        cy.intercept('GET', '**/dashboard/shortcuts').as('shortcuts')
        cy.wait('@shortcuts').its('response.statusCode').should('eq', 200)
    }

    // verifyTimeAtWork(){
    //     cy.url().should('include','**dashboard/employees/time-at-work*')

    // }
    // verifyShortcuts(){
    //     cy.url().should('include','/shortcuts')
    // }
    verifySubUnit(){
        cy.intercept('GET', '**/api/v2/dashboard/employees/subunit').as('subUnit')
        // cy.url().should('include','/subunit')
         cy.wait('@subUnit').its('response.statusCode').should('eq', 200)
    }
}

export default new Tugas17Page()