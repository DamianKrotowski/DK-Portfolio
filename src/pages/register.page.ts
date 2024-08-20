import { Locator, Page } from '@playwright/test';
import { register } from 'module';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly birthDateInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly firstNameErrorMsg: Locator;
  readonly lastNameErrorMsg: Locator;
  readonly emailErrorMsg: Locator;
  readonly passwordErrorMsg: Locator;
  readonly birthDateErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstname-input');
    this.lastNameInput = page.getByTestId('lastname-input');
    this.emailInput = page.getByTestId('email-input');
    this.birthDateInput = page.getByTestId('birthdate-input');
    this.passwordInput = page.getByTestId('password-input');
    this.registerButton = page.getByTestId('register-button');

    this.firstNameErrorMsg = page.locator('#octavalidate_firstname');
    this.lastNameErrorMsg = page.locator('#octavalidate_lastname');
    this.emailErrorMsg = page.locator('#octavalidate_email');
    this.passwordErrorMsg = page.locator('#octavalidate_password');
    this.birthDateErrorMsg = page.getByText(
      'Date must be in format YYYY-MM-DD',
    );
  }
  async register(
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    password: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.birthDateInput.fill(birthDate);
    await this.birthDateInput.press('Escape');
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }
}
