import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  firstNameInput = this.page.getByTestId('firstname-input')
  lastNameInput = this.page.getByTestId('lastname-input')
  emailInput = this.page.getByTestId('email-input')
  birthDateInput = this.page.getByTestId('birthdate-input')
  passwordInput = this.page.getByTestId('password-input')
  registerButton = this.page.getByTestId('register-button')

  firstNameErrorMsg =  this.page.locator('#octavalidate_firstname')
  lastNameErrorMsg = this.page.locator('#octavalidate_lastname')
  emailErrorMsg = this.page.locator('#octavalidate_email')
  passwordErrorMsg = this.page.locator('#octavalidate_password')
  birthDateErrorMsg = this.page.getByText('Date must be in format YYYY-MM-DD')



  async register(firstName: string, lastName: string, email: string, birthDate: string, password: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.birthDateInput.fill(birthDate);
    await this.birthDateInput.press('Escape');
    await this.passwordInput.fill(password);
    await this.registerButton.click()
  }
}
