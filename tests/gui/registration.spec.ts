import { expect, test } from '@_pages/gadPageObjects';
import { wrongUserData } from '@_testdata/user.data';
import { randomUser } from 'src/factories/user.factory';

test.describe('Registration tests', () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    await page.goto('/');
    await navigationPage.goToRegister();
  });

  test(
    'successful register minimal required data',
    { tag: '@smoke' },
    async ({ utility, registerPage, loginPage }) => {
      const expectedAlert = 'User created';
      const registerUserData = randomUser();

      await registerPage.firstNameInput.fill(registerUserData.userFirstName);
      await registerPage.lastNameInput.fill(registerUserData.userLastName);
      await registerPage.emailInput.fill(registerUserData.userEmail);
      await registerPage.passwordInput.fill(registerUserData.userPassword);
      await registerPage.registerButton.click();

      await expect(utility.alertPopUp).toHaveText(expectedAlert);
      await expect(loginPage.loginButton).toBeVisible();

      await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      await expect(loginPage.logoutButton).toBeVisible();
    },
  );

  test('successful register all data', async ({ utility, registerPage }) => {
    const expectedAlert = 'User created';
    const registerUserData = randomUser();

    await registerPage.register(registerUserData);
    await expect(utility.alertPopUp).toHaveText(expectedAlert);
  });

  test('Unsuccessful register with blank data', async ({ registerPage }) => {
    const expectedErrorMsg = 'This field is required';

    await registerPage.registerButton.click();

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

    const registerUserData = randomUser();
    registerUserData.userEmail = wrongUserData.email;
    registerUserData.userBirthDate = wrongUserData.birthDate;

    await registerPage.register(registerUserData);
    await expect(registerPage.emailErrorMsg).toHaveText(expectedEmailErrorMsg);
    await expect(registerPage.birthDateErrorMsg).toHaveText(
      expectedBirthErrorMsg,
    );
  });
});
