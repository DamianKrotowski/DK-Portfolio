import { Page } from '@playwright/test';

export class WelcomePage {
  constructor(private page: Page) {}

  logoutButton = this.page.getByTestId('logoutButton');
  myProfileButton = this.page.getByRole('button', { name: 'My profile' });

  async logoutAfterLogin(): Promise<void> {
    await this.logoutButton.click();
  }

  async goToMyProfile(): Promise<void> {
    await this.myProfileButton.click();
  }
}
