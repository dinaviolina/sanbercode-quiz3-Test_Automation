describe('Login Orange - Tugas 16', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // Tunggu input username muncul (indikator halaman siap)
    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
  })

  it('TC_LOG_001 - Cek tombol login tanpa input data', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('button[type="submit"]')
      .should('be.visible')
      .click()

    // Catatan: request bisa saja TIDAK terkirim
    cy.wait('@loginRequest', { timeout: 10000 })

    cy.get('.oxd-input-group__message')
      .should('be.visible')
      .and('contain.text', 'Required')
  })
})
