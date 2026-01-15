// Gunakan POM pada action dan data yang digunakan.
// Pastikan script berjalan dengan baik.
// Hasil di push ke github dengan repository yang sama tetapi dalam folder yang berbeda.

import tugas17Page from "../../support/tugas17Page"
import loginData from "../../fixtures/tugas17Data.json" 
describe('Page Object Model (POM)', ()=> {
    it('TC_LOG_01 Login dengan username dan password valid', ()=> {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.validUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLoginSuccess()
    

    })
    it('TC_LOG_02 - Login username benar, password salah (Negative)', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.validUsername)
    tugas17Page.inputPassword(loginData.invalidPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLoginFailed()
    })
    it('TC_LOG_03 - Login dengan username diawali spasi (Negative)', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.spaceUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLoginFailed()
    })
  it('TC_LOG_04 - Wrong username, valid password', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.invalidUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLoginFailed()
  })
  it('TC_LOG_05 - Wrong username & password', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.invalidUsername)
    tugas17Page.inputPassword(loginData.invalidPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLoginFailed()
  })
  it('TC_LOG_06 - Password Huruf Besar Semua', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.spaceUsername)
    tugas17Page.inputPassword(loginData.uppercasePassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLoginFailed()
  })
  it('TC_LOG_07 - Dashboard Locations loaded', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.validUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyLocations()
  })
  it('TC_LOG_08 - Dashboard time at work loaded', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.validUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyTimeAtWork()
  })
  it('TC_LOG_09 - Dashboard shortcuts loaded', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.validUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifyShortcuts()
  })
  it('TC_LOG_10 - Dashboard Sub unit ', () => {
    tugas17Page.visit()
    tugas17Page.inputUsername(loginData.validUsername)
    tugas17Page.inputPassword(loginData.validPassword)
    tugas17Page.loginButton()
    tugas17Page.verifySubUnit()
    })
})    
