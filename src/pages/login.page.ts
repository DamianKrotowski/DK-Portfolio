import { Page, Locator } from '@playwright/test';

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
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
