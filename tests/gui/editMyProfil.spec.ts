import { prepareRandomUser } from '@_factories/user.factory';
import { editUserData } from '@_testdata/user.data';
import { expect, test } from 'src/ui/fixture/gadPageObjects.fixture';

test.describe('Edit my profile tests', () => {
  test('Successfully edited full profile with re-login with new details', async ({
    page,
    loginPage,
    registerPage,
    navigationPage,
    welcomePage,
    myProfilePage,
    editMyProfilePage,
  }) => {
    const registerUserData = prepareRandomUser();
    const editedEmail = registerUserData.userEmail + 'edited';
    await page.goto('/');
    await navigationPage.goToRegister();
    await registerPage.register(registerUserData);
    await expect(loginPage.loginButton).toBeVisible();

    await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    await expect(welcomePage.myProfileButton).toBeVisible();

    await welcomePage.myProfileButton.click();
    await expect(myProfilePage.firstNameValue).toBeVisible();

    await myProfilePage.editButton.click();
    await editMyProfilePage.firstNameInput.fill(editUserData.firstName);
    await editMyProfilePage.lastNameInput.fill(editUserData.lastName);
    await editMyProfilePage.emailInput.fill(editedEmail);
    await editMyProfilePage.editPasswordCheckbox.click();
    await editMyProfilePage.passwordInput.fill(editUserData.password);
    await editMyProfilePage.updateButton.click();
    await expect(myProfilePage.firstNameValue).toHaveText(
      editUserData.firstName,
    );
    await expect(myProfilePage.lastNameValue).toHaveText(editUserData.lastName);
    await expect(myProfilePage.emailValue).toHaveText(editedEmail);

    await navigationPage.logout();
    await loginPage.login({
      userEmail: editedEmail,
      userPassword: editUserData.password,
    });
    await expect(loginPage.logoutButton).toBeVisible();
  });
});
