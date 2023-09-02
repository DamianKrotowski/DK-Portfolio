import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../src/pages/register.page';
import { LoginPage } from '../../src/pages/login.page';
import { regularUserData } from '../../src/testdata/user.data';
import { NavigationPage } from '../../src/components/navbar';
import { Utility } from '../../src/pages/utility.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { MyProfilePage } from '../../src/pages/profile/myProfile.page';
import { EditMyProfilePage } from '../../src/pages/profile/editMyProfil.page';
import { editUserData } from '../../src/testdata/user.data';

test.describe('Edit my profil tests', () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;
  let welcomePage: WelcomePage;
  let myProfilePage: MyProfilePage;
  let editMyProfilePage: EditMyProfilePage;
  let utility: Utility;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    navigationPage = new NavigationPage(page);
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    myProfilePage = new MyProfilePage(page);
    editMyProfilePage = new EditMyProfilePage(page);
    utility = new Utility(page);

    const email = await utility.randomEmail();

    await page.goto('/');
    await navigationPage.goToRegister();
    await registerPage.register(
      regularUserData.firstName,
      regularUserData.lastName,
      email,
      regularUserData.birthDate,
      regularUserData.password,
    );
    await expect(loginPage.loginButton).toBeVisible({ timeout: 30000 });
    await loginPage.login(email, regularUserData.password);
    await expect(welcomePage.myProfilButton).toBeVisible();
    await welcomePage.goToMyProfil();
    await expect(myProfilePage.firstNameValue).toBeVisible();
    await myProfilePage.goToEditMyProfil();
  });

  test('Successfully edited full profile with re-login with new details', async ({
    page,
  }) => {
    // Arrange
    const editedEmail = await utility.randomEmail();
    // Act
    await editMyProfilePage.setFirstName(editUserData.firstName); // Edit data
    await editMyProfilePage.setLastName(editUserData.lastName);
    await editMyProfilePage.setEmail(editedEmail);
    await editMyProfilePage.setChangePassword();
    await editMyProfilePage.setPassword(editUserData.password);
    await editMyProfilePage.upadateProfil();
    await expect(myProfilePage.firstNameValue).toHaveText(
      editUserData.firstName,
    ); // Checking edited data
    await expect(myProfilePage.lastNameValue).toHaveText(editUserData.lastName);
    await expect(myProfilePage.emailValue).toHaveText(editedEmail);
    await navigationPage.logout();
    await loginPage.login(editedEmail, editUserData.password); // Try login with edited data
    // Assert
    await expect(loginPage.logoutButton).toBeVisible();
  });
});
