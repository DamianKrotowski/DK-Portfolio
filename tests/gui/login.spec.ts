import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../src/pages/register.page";
import { LoginPage } from "../../src/pages/login.page";
import { blankUserData, regularUserData, wrongUserData } from "../../src/testdata/user.data";
import { NavigationPage } from "../../src/pages/navigation.page";
import { WelcomePage } from "../../src/pages/welcome.page";

test.describe("Login tests", () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    navigationPage = new NavigationPage(page);
    loginPage = new LoginPage(page);

    await page.goto("/");
    await navigationPage.goToLogin();
  });

  test("Successful login", async ({ page }) => {
    // Arrange
    // Act
    await loginPage.login(regularUserData.email, regularUserData.password);
    // Assert
    await expect(loginPage.logoutButton).toBeVisible();
  });

  test("Unsuccessful login with blank data", async ({ page }) => {
    // Arrange
    const expectedLoginError = 'Invalid username or password'
    // Act
    await loginPage.login(blankUserData.email, blankUserData.password);
    // Assert
    await expect(loginPage.loginErrorNotification).toHaveText(expectedLoginError);
  });

  test("Unsuccessful login with wrong data email and password", async ({ page }) => {
    // Arrange
    const expectedLoginError = 'Invalid username or password'
    // Act
    await loginPage.login(wrongUserData.email, wrongUserData.password);
    // Assert
    await expect(loginPage.loginErrorNotification).toHaveText(expectedLoginError);
  });

  test("Unsuccessful login with correct email and wrong password ", async ({ page }) => {
    // Arrange
    const expectedLoginError = 'Invalid username or password'
    // Act
    await loginPage.login(regularUserData.email, wrongUserData.password);
    // Assert
    await expect(loginPage.loginErrorNotification).toHaveText(expectedLoginError);
  });

  test("Unsuccessful login with correct password and wrong email ", async ({ page }) => {
    // Arrange
    const expectedLoginError = 'Invalid username or password'
    // Act
    await loginPage.login(wrongUserData.email, regularUserData.password);
    // Assert
    await expect(loginPage.loginErrorNotification).toHaveText(expectedLoginError);
  });
});

test.describe("Logout tests", () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    let navigationPage: NavigationPage;
    let welcomePage: WelcomePage;

    test.beforeEach(async ({ page }) => {
      registerPage = new RegisterPage(page);
      navigationPage = new NavigationPage(page);
      loginPage = new LoginPage(page);
      welcomePage = new WelcomePage(page);

      await page.goto("/");
      await navigationPage.goToLogin();
      await loginPage.login(regularUserData.email, regularUserData.password);
    });
  
    test("Logout after login test", async ({ page }) => {
      // Arrange
      // Act
      await welcomePage.logoutAfterLogin();
      // Assert
      await expect(loginPage.loginButton).toBeVisible();
    });

    test("Logout from nagivation panel test", async ({ page }) => {
        // Arrange
        // Act
        await navigationPage.logout();
        // Assert
        await expect(loginPage.loginButton).toBeVisible();
      });
  });
