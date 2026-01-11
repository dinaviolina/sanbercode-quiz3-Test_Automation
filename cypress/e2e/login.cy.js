describe('Login OrangeHRM', () => {
  // Perintah untuk menjalankan URL Login sebelum masing-masing skenario Ts dijalankan
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
  // Test Case yag dijalankan
  it('TC_LOG_001 - Cek tombol login tanpa input data', () => {
    // 1. Pastikan tombolnya ada dulu
    cy.get('button[type="submit"]').should('be.visible')
    // 2. Klik tombolnya
    cy.get('button[type="submit"]').click()
    // 3. Cek hasilnya (Ekspektasi: Muncul pesan error karena data kosong)
    cy.get('.oxd-input-group__message').should('be.visible')
})
  // Memerika kolom  input username
  it('TC_LOG_005 - Login tanpa password (Negative)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
})
  it('TC_LOG_008 - Login dengan username diawali spasi (Negative)', () => {
    // Pastikan input username ada dulu sebelum di-type
    cy.get('input[name="username"]').should('be.visible').type(' Admin')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').click()
    // Gunakan timeout tambahan khusus untuk alert jika internet sedang lambat
    cy.get('.oxd-alert-content', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials')
})
  // Memeriksa kolom input password
it('TC_LOG_011 - Memeriksa inputan password huruf besar semua (Negative)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials')
  })

  it('TC_LOG_012 - Login dengan password diawali spasi (Negative)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type(' admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials')
  })
  it('TC_LOG_013 - Login hanya dengan password tanpa username (Negative)', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
  })
  it('TC_LOG_014 - Login username benar, password salah (Negative)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin1234')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials')
  })
  it('TC_LOG_015 - Login username salah, password benar (Negative)', () => {
    cy.get('input[name="username"]').type('adminnn')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials')
  })
  it('TC_LOG_020 - Login username benar, password benar (Positive)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    // Assertion: Berhasil masuk ke halaman dashboard
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard')
  })
  it('TC_LOG_021 - Login dengan email yang tidak terdaftar (Negative)', () => {
    cy.get('input[name="username"]').type('admin@gmail.com')
    cy.get('input[name="password"]').type('admin12')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content ').should('be.visible').and('contain', 'Invalid credentials')

  })
})