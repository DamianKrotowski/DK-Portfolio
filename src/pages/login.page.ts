import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  emailInput = this.page.getByPlaceholder('Enter User Email');
  passwordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });
  logoutButton = this.page.getByTestId('logoutButton');
  loginErrorNotification = this.page.getByTestId('login-error');

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
