import { expect, test } from '@_pages/gadPageObjects';
import {
  blankUserData,
  primaryUserData,
  regularUserData,
  wrongUserData,
} from '@_testdata/user.data';
import { LoginUser } from 'src/models/user.model';

test.describe('Login tests', () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    await page.goto('/');
    await navigationPage.goToLogin();
  });

  test('Successful login', { tag: '@smoke' }, async ({ loginPage }) => {
    await loginPage.login(primaryUserData);

    await expect(loginPage.logoutButton).toBeVisible();
  });

  test('Unsuccessful login with blank data', async ({ loginPage }) => {
    const expectedLoginError = 'Invalid username or password';
    const loginUserData: LoginUser = {
      userEmail: blankUserData.email,
      userPassword: blankUserData.password,
    };

    await loginPage.login(loginUserData);
    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });

  test('Unsuccessful login with correct email and wrong password', async ({
    loginPage,
  }) => {
    const expectedLoginError = 'Invalid username or password';
    const loginUserData: LoginUser = {
      userEmail: regularUserData.email,
      userPassword: wrongUserData.password,
    };
    await loginPage.login(loginUserData);

    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });

  test('Unsuccessful login with wrong email and password', async ({
    loginPage,
  }) => {
    const expectedLoginError = 'Invalid username or password';
    const loginUserData: LoginUser = {
      userEmail: wrongUserData.email,
      userPassword: wrongUserData.password,
    };
    await loginPage.login(loginUserData);

    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });
});

test.describe('Logout tests', () => {
  test.beforeEach(async ({ page, navigationPage, loginPage }) => {
    await page.goto('/');
    await navigationPage.goToLogin();
    await loginPage.login(primaryUserData);
  });

  test('Logout after login test', async ({ welcomePage, loginPage }) => {
    await welcomePage.logoutButton.click();

    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Logout from navigation panel test', async ({
    navigationPage,
    loginPage,
  }) => {
    await navigationPage.logout();

    await expect(loginPage.loginButton).toBeVisible();
  });
});
