describe('Tugas 16 Intercept Login OrangeHRM', ()=>{
    beforeEach(()=>{
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    // Test Case 1 Login Berhasil
    it('TC_LOG_01 - Login username benar, password benar (Positive)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    // intercept
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummaryLogin')
    cy.get('[type="submit"]').click()
    // Assertion: Berhasil masuk ke halaman dashboard
    cy.url().should('include', '/dashboard')
    // lockated
    cy.get('.oxd-topbar-header-breadcrumb-module').should('be.visible', 'Dashboard')
    cy.wait('@actionSummaryLogin')
})
    // Test Case 2 Gagal login
    it('TC_LOG_02 - Login username benar, password salah (Negative)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin1234')
    // intercept
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('LoginFailedPassword')
    cy.get('[type="submit"]').click()
    // assertion tetap di halaman login
    // 
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials')
    cy.wait('@LoginFailedPassword')
})
    // Test Case 3
    it('TC_LOG_03 - Login dengan username diawali spasi (Negative)', () => {
        cy.get('input[name="username"]').type(' Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('loginUsernameSpace')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content')
        .should('be.visible')
        .and('contain', 'Invalid credentials')
        cy.wait('@loginUsernameSpace')
  })

  // Test Case 4
  it('TC_LOG_04 - Wrong username, valid password', () => {
      cy.get('input[name="username"]').type('adminnn')
      cy.get('input[name="password"]').type('admin123')
      cy.intercept('POST', '**/auth/validate').as('loginFail2')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail2')
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  //// Test Case 5
  it('TC_LOG_05 - Wrong username & password', () => {
      
      cy.get('input[name="username"]').type('adminnn')
      cy.get('input[name="password"]').type('admin1234')
      cy.intercept('POST', '**/auth/validate').as('loginFail3')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail3')
    cy.get('.oxd-alert-content').should('be.visible')
  })

  // // Test Case 6
  // it('TC_LOG_06 - Username with leading space cara 2', () => {
      
  //     cy.get('input[name="username"]').type(' Admin')
  //     cy.get('input[name="password"]').type('admin123')
  //     cy.intercept('POST', '**/auth/validate').as('loginFail4')
  //   cy.get('button[type="submit"]').click()

  //   cy.wait('@loginFail4')
  //   cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  // })

  //// Test Case 6
  it('TC_LOG_06 - Password Huruf Besar Semua', () => {
      
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('ADMIN123')
      cy.intercept('POST', '**/auth/validate').as('loginFail5')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail5')
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  // 8 Login sukses → dashboard load
  // it('TC_LOG_08 - Login success menuju Dashboard', () => {
      
  //     cy.get('input[name="username"]').type('Admin')
  //     cy.get('input[name="password"]').type('admin123')
  //     cy.intercept('GET', '**/dashboard/**').as('dashboardLoad')
  //   cy.get('button[type="submit"]').click()

  //   cy.wait('@dashboardLoad')
  //   cy.url().should('include', '/dashboard')
  // })

  // 7 Login sukses → action summary
  it('TC_LOG_07 - Dashboard Locations loaded', () => {
      
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.intercept('GET', '**/api/v2/dashboard/employees/locations').as('Locations')
    cy.get('button[type="submit"]').click()

    cy.wait('@Locations')
    cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard')
  })

  // 8 Login sukses → time at work
  it('TC_LOG_08 - Dashboard time at work loaded', () => {
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/time-at-work*').as('timeAtWork')
      cy.get('button[type="submit"]').click()

    cy.wait('@timeAtWork')
  })

  // 9 Login sukses → shortcuts API
  it('TC_LOG_9 - Dashboard shortcuts loaded', () => {
    // cy.intercept('GET', '**/api/v2/dashboard/shortcuts').as('shortcuts')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts')
    cy.get('button[type="submit"]').click()

    cy.wait('@shortcuts')
  })

  // 10 Login sukses → buzz feed
  it('TC_LOG_10 - Dashboard buzz feed loaded', () => {
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.intercept('GET', '**/api/v2/buzz/feed*').as('buzzFeed')
    cy.get('button[type="submit"]').click()
    cy.wait('@buzzFeed')
  })

})
