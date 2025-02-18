import { LoginUserModel } from '@_models/user.model';
import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly loginErrorNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Enter User Email');
    this.passwordInput = page.getByPlaceholder('Enter Password');
    this.loginButton = page.getByRole('button', { name: 'LogIn' });
    this.logoutButton = page.getByTestId('logoutButton');
    this.loginErrorNotification = page.getByTestId('login-error');
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    try {
      await this.emailInput.fill(loginUserData.userEmail);
      await this.passwordInput.fill(loginUserData.userPassword);
      await this.loginButton.click();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during login:', error);
    }
  }

  async goTo(): Promise<void> {
    await this.page.goto('/');
  }
}
