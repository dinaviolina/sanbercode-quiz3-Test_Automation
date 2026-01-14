describe('Scenario verifikasi fungsi', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')  
  })
  it('Login', () => {
    // masukkan username
    cy.get('[name="username"]').type('Admin');
    // masukkan password
    cy.get('[name="password"]').type('admin123');
    // masukkan intercept yang diperoleh dari klik kanan selectorHub, Network 
    // intercept diletakkan sebelum aksi klik
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
    // klik tombol login
    cy.get('[type="submit"]').click();
    cy.wait('@actionSummary');
      // , { timeout: 20000 })
      // .its('response.statusCode')
      // .should('eq', 200)
  })

  })
  
