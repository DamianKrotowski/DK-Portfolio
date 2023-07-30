import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { LoginPage } from "../pages/login.page";
import { regularUserData } from "../testdata/user.data";
import { NavigationPage } from "../pages/navigation.page";
import { Utility } from "../pages/utility.page";
import { WelcomePage } from "../pages/welcome.page";
import { MyProfilePage } from "../pages/myProfile.page";
import { EditMyProfilePage } from "../pages/editMyProfil.page";
import { editUserData } from "../testdata/user.data";

test.describe.only("Edit my profil tests", () => {
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

    const email = `${await utility.generateRandomValue()}${regularUserData.email}`;

    await page.goto("/");
    await navigationPage.goToRegister();
    await registerPage.register(
      regularUserData.firstName,
      regularUserData.lastName,
      email,
      regularUserData.birthDate,
      regularUserData.password
    );
    await expect(loginPage.loginButton).toBeVisible();
    await loginPage.login(email, regularUserData.password);
    await welcomePage.goToMyProfil()
    await myProfilePage.goToEditMyProfil()
  });

  test("Successfully edited full profile with re-login with new details", async ({ page }) => {
    // Arrange
    const editedEmail = `${await utility.generateRandomValue()}${regularUserData.email}`;
    // Act
    await editMyProfilePage.setFirstName(editUserData.firstName) // Edit data
    await editMyProfilePage.setLastName(editUserData.lastName)
    await editMyProfilePage.setEmail(editedEmail)
    await editMyProfilePage.setChangePassword()
    await editMyProfilePage.setPassword(editUserData.password)
    await editMyProfilePage.upadateProfil()
    await expect(myProfilePage.firstNameValue).toHaveText(editUserData.firstName); // Checking edited data
    await expect(myProfilePage.lastNameValue).toHaveText(editUserData.lastName);
    await expect(myProfilePage.emailValue).toHaveText(editedEmail);
    await navigationPage.logout()
    await loginPage.login(editedEmail,editUserData.password) // Try login with edited data
    // Assert
    await expect(loginPage.logoutButton).toBeVisible();
  });
});
