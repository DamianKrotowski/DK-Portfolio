import { Page } from '@playwright/test';

export class NavigationPage {
  constructor(private page: Page) {}

  userIconButton = this.page.getByTestId('btn-dropdown');
  registerButton = this.page.getByRole('link', { name: 'Register' });
  loginButton = this.page.getByRole('link', { name: 'Login' });
  logoutButton = this.page.getByTestId('user-dropdown').getByRole('link', { name: 'Logout' });
  articlesButton = this.page.getByTestId('open-articles');
  commentsButton = this.page.getByTestId('open-comments');
  usersButton = this.page.getByTestId('open-users');
  statisticsButton = this.page.getByTestId('open-stats');

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

  async goToArticles(): Promise<void> {
    await this.articlesButton.click();
  }

  async goToComments(): Promise<void> {
    await this.commentsButton.click();
  }

  async goToUsers(): Promise<void> {
    await this.usersButton.click();
  }

  async goToStatistics(): Promise<void> {
    await this.statisticsButton.click();
  }

  async clickOnTab(tabName): Promise<void> {
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
