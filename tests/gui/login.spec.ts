import {
  blankUserData,
  regularUserData,
  wrongUserData,
} from '@_testdata/user.data';
import { expect, test } from '@_pages/gadPageObjects';

test.describe('Login tests', () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    await page.goto('/');
    await navigationPage.goToLogin();
  });

  test('Successful login', async ({ loginPage }) => {
    await loginPage.login(regularUserData.email, regularUserData.password);

    await expect(loginPage.logoutButton).toBeVisible();
  });

  test('Unsuccessful login with blank data', async ({ loginPage }) => {
    const expectedLoginError = 'Invalid username or password';

    await loginPage.login(blankUserData.email, blankUserData.password);

    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });

  test('Unsuccessful login with wrong data email and password', async ({
    loginPage,
  }) => {
    const expectedLoginError = 'Invalid username or password';

    await loginPage.login(wrongUserData.email, wrongUserData.password);

    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });

  test('Unsuccessful login with correct email and wrong password ', async ({
    loginPage,
  }) => {
    const expectedLoginError = 'Invalid username or password';

    await loginPage.login(regularUserData.email, wrongUserData.password);

    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });

  test('Unsuccessful login with correct password and wrong email ', async ({
    loginPage,
  }) => {
    const expectedLoginError = 'Invalid username or password';

    await loginPage.login(wrongUserData.email, regularUserData.password);

    await expect(loginPage.loginErrorNotification).toHaveText(
      expectedLoginError,
    );
  });
});

test.describe('Logout tests', () => {
  test.beforeEach(async ({ page, navigationPage, loginPage }) => {
    await page.goto('/');
    await navigationPage.goToLogin();
    await loginPage.login(regularUserData.email, regularUserData.password);
  });

  test('Logout after login test', async ({ welcomePage, loginPage }) => {
    await welcomePage.logoutAfterLogin();

    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Logout from nagivation panel test', async ({
    navigationPage,
    loginPage,
  }) => {
    await navigationPage.logout();

    await expect(loginPage.loginButton).toBeVisible();
  });
});
