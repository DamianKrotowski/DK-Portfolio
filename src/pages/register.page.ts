import { Locator, Page } from '@playwright/test';
import { RegisterUser } from 'src/models/user.model';

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
  async register(registerUserData: RegisterUser): Promise<void> {
    await this.firstNameInput.fill(registerUserData.userFirstName);
    await this.lastNameInput.fill(registerUserData.userLastName);
    await this.emailInput.fill(registerUserData.userEmail);
    await this.birthDateInput.fill(registerUserData.userBirthDate);
    await this.birthDateInput.press('Escape');
    await this.passwordInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
