describe('Tugas 16 Intercept Login OrangeHRM', ()=>{
    beforeEach(()=>{
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    // Test Case 1 Login Berhasil
    it('TC_LOG_020 - Login username benar, password benar (Positive)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    // intercept
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummaryLogin')
    cy.get('button[type="submit"]').click()
    // Assertion: Berhasil masuk ke halaman dashboard
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard')
    cy.wait('@actionSummaryLogin')
})

    // Test Case 2
    // Test Case 3
    // Test Case 4
    // Test Case 5
    // Test Case 6
    // Test Case 7
    // Test Case 8
    // Test Case 9
    // Test Case 10

})