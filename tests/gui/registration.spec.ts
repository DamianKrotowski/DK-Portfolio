import { expect, test } from '@_pages/gadPageObjects';
import {
  blankUserData,
  regularUserData,
  wrongUserData,
} from '@_testdata/user.data';

test.describe('Registration tests', () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    await page.goto('/');
    await navigationPage.goToRegister();
  });

  test('successful register minimal required data', async ({
    utility,
    registerPage,
  }) => {
    const expectedAlert = 'User created';
    const email = await utility.randomEmail();

    await registerPage.register(
      regularUserData.firstName,
      regularUserData.lastName,
      email,
      blankUserData.birthDate,
      regularUserData.password,
    );

    await expect(utility.alertPopUp).toHaveText(expectedAlert);
  });

  test('successful register all data', async ({ utility, registerPage }) => {
    const expectedAlert = 'User created';
    const email = await utility.randomEmail();

    await registerPage.register(
      regularUserData.firstName,
      regularUserData.lastName,
      email,
      regularUserData.birthDate,
      regularUserData.password,
    );

    await expect(utility.alertPopUp).toHaveText(expectedAlert);
  });

  test('Unsuccessful register with blank data', async ({ registerPage }) => {
    const expectedErrorMsg = 'This field is required';

    await registerPage.register(
      blankUserData.firstName,
      blankUserData.lastName,
      blankUserData.email,
      blankUserData.birthDate,
      blankUserData.password,
    );

    await expect(registerPage.firstNameErrorMsg).toHaveText(expectedErrorMsg);
    await expect(registerPage.lastNameErrorMsg).toHaveText(expectedErrorMsg);
    await expect(registerPage.emailErrorMsg).toHaveText(expectedErrorMsg);
    await expect(registerPage.passwordErrorMsg).toHaveText(expectedErrorMsg);
  });

  test('Unsuccessful register with incorrect birth and email data format', async ({
    registerPage,
  }) => {
    const expectedEmailErrorMsg = 'Please provide a valid email address';
    const expectedBirthErrorMsg = 'Date must be in format YYYY-MM-DD';

    await registerPage.register(
      blankUserData.firstName,
      blankUserData.lastName,
      wrongUserData.email,
      wrongUserData.birthDate,
      blankUserData.password,
    );

    await expect(registerPage.emailErrorMsg).toHaveText(expectedEmailErrorMsg);
    await expect(registerPage.birthDateErrorMsg).toHaveText(
      expectedBirthErrorMsg,
    );
  });
});
