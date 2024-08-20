import { Locator, Page } from '@playwright/test';

export class WelcomePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly myProfileButton: Locator;

  constructor(page: Page) {
    this.logoutButton = page.getByTestId('logoutButton');
    this.myProfileButton = page.getByRole('button', { name: 'My profile' });
  }
}
