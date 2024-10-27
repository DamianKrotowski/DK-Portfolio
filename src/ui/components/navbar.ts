import { Locator, Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly userIconButton: Locator;
  readonly registerButton: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly commentsButton: Locator;
  readonly usersButton: Locator;
  readonly statisticsButton: Locator;
  readonly articlesButton: Locator;
  constructor(page: Page) {
    this.userIconButton = page.getByTestId('btn-dropdown');
    this.registerButton = page.getByRole('link', { name: 'Register' });
    this.loginButton = page.getByRole('link', { name: 'Login' });
    this.logoutButton = page
      .getByTestId('user-dropdown')
      .getByRole('link', { name: 'Logout' });
    this.articlesButton = page.getByTestId('open-articles');
    this.commentsButton = page.getByTestId('open-comments');
    this.usersButton = page.getByTestId('open-users');
    this.statisticsButton = page.getByTestId('open-stats');
  }
  async goToRegister(): Promise<void> {
    await this.userIconButton.click();
    await this.registerButton.click();
  }

  async goToLogin(): Promise<void> {
    await this.userIconButton.click();
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.userIconButton.click();
    await this.logoutButton.click();
  }

  async clickOnTab(tabName: string): Promise<void> {
    switch (tabName) {
      case 'Statistics':
        await this.statisticsButton.click();
        break;
      case 'Users':
        await this.usersButton.click();
        break;
      case 'Comments':
        await this.commentsButton.click();
        break;
      case 'Articles':
        await this.articlesButton.click();
        break;
      case 'logout':
        await this.userIconButton.click();
        await this.logoutButton.click();
        break;
      case 'Login':
        await this.userIconButton.click();
        await this.loginButton.click();
        break;
      case 'Register':
        await this.userIconButton.click();
        await this.registerButton.click();
        break;

      default:
        throw new Error('This tab does not exist..');
    }
  }
}
