import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../src/pages/register.page';
import {
  blankUserData,
  regularUserData,
  wrongUserData,
} from '../../src/testdata/user.data';
import { NavigationPage } from '../../src/components/navbar';
import { Utility } from '../../src/pages/utility.page';

test.describe('Registration tests', () => {
  let registerPage: RegisterPage;
  let navigationPage: NavigationPage;
  let utility: Utility;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    navigationPage = new NavigationPage(page);
    utility = new Utility(page);

    await page.goto('/');
    await navigationPage.goToRegister();
  });

  test('successful register minimal required data', async ({ page }) => {
    // Arrange
    const expectedAlert = 'User created';
    const email = await utility.randomEmail();
    // Act
    await registerPage.register(
      regularUserData.firstName,
      regularUserData.lastName,
      email,
      blankUserData.birthDate,
      regularUserData.password,
    );
    // Assert
    await expect(utility.alertPopUp).toHaveText(expectedAlert);
  });

  test('successful register all data', async ({ page }) => {
    // Arrange
    const expectedAlert = 'User created';
    const email = await utility.randomEmail();
    // Act
    await registerPage.register(
      regularUserData.firstName,
      regularUserData.lastName,
      email,
      regularUserData.birthDate,
      regularUserData.password,
    );
    // Assert
    await expect(utility.alertPopUp).toHaveText(expectedAlert);
  });

  test('Unsuccessful register with blank data', async ({ page }) => {
    // Arrange
    const expectedErrorMsg = 'This field is required';
    // Act
    await registerPage.register(
      blankUserData.firstName,
      blankUserData.lastName,
      blankUserData.email,
      blankUserData.birthDate,
      blankUserData.password,
    );
    // Assert
    await expect(registerPage.firstNameErrorMsg).toHaveText(expectedErrorMsg);
    await expect(registerPage.lastNameErrorMsg).toHaveText(expectedErrorMsg);
    await expect(registerPage.emailErrorMsg).toHaveText(expectedErrorMsg);
    await expect(registerPage.passwordErrorMsg).toHaveText(expectedErrorMsg);
  });

  test('Unsuccessful register with unvalid birth and email data format', async ({
    page,
  }) => {
    // Arrange
    const expectedEmailErrorMsg = 'Please provide a valid email address';
    const expectedBirthErrorMsg = 'Date must be in format YYYY-MM-DD';
    // Act
    await registerPage.register(
      blankUserData.firstName,
      blankUserData.lastName,
      wrongUserData.email,
      wrongUserData.birthDate,
      blankUserData.password,
    );
    // Assert
    await expect(registerPage.emailErrorMsg).toHaveText(expectedEmailErrorMsg);
    await expect(registerPage.birthDateErrorMsg).toHaveText(
      expectedBirthErrorMsg,
    );
  });
});
