import { prepareRandomUser } from '@_factories/user.factory';
import { wrongUserData } from '@_testdata/user.data';
import { expect, test } from 'src/ui/fixture/gadPageObjects.fixture';

test.describe('Registration tests', () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await navigationPage.goToRegister();
  });

  test(
    'successful register minimal required data',
    { tag: '@smoke' },
    async ({ utility, registerPage, loginPage }) => {
      const expectedAlert = 'User created';
      const registerUserData = prepareRandomUser();

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
    const registerUserData = prepareRandomUser();

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

    const registerUserData = prepareRandomUser();
    registerUserData.userEmail = wrongUserData.email;
    registerUserData.userBirthDate = wrongUserData.birthDate;

    await registerPage.register(registerUserData);
    await expect(registerPage.emailErrorMsg).toHaveText(expectedEmailErrorMsg);
    await expect(registerPage.birthDateErrorMsg).toHaveText(
      expectedBirthErrorMsg,
    );
  });
});
