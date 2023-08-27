import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../src/pages/register.page';
import { LoginPage } from '../../src/pages/login.page';
import { regularUserData } from '../../src/testdata/user.data';
import { NavigationPage } from '../../src/pages/navigation.page';
import { Utility } from '../../src/pages/utility.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { MyProfilePage } from '../../src/pages/profile/myProfile.page';
import { EditMyProfilePage } from '../../src/pages/profile/editMyProfil.page';
import { newArticleData } from '../../src/testdata/articles.data';
import { ArticlesPage } from '../../src/pages/articles/articles.page';
import { AddArticlesPage } from '../../src/pages/articles/addArticleForm.page';
import { ArticleProfilPage } from '../../src/pages/articles/articleProfile.page';

test.describe('Articles tests', () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;
  let welcomePage: WelcomePage;
  let myProfilePage: MyProfilePage;
  let editMyProfilePage: EditMyProfilePage;
  let utility: Utility;
  let articlesPage: ArticlesPage;
  let addArticlesPage: AddArticlesPage;
  let articleProfilPage: ArticleProfilPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    navigationPage = new NavigationPage(page);
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    myProfilePage = new MyProfilePage(page);
    editMyProfilePage = new EditMyProfilePage(page);
    utility = new Utility(page);
    articlesPage = new ArticlesPage(page);
    addArticlesPage = new AddArticlesPage(page);
    articleProfilPage = new ArticleProfilPage(page);

    const email = `${await utility.generateRandomValue()}${
      regularUserData.email
    }`;

    await page.goto('/');
    await navigationPage.goToLogin();
    await loginPage.login(regularUserData.email, regularUserData.password);
    await navigationPage.goToArticles();
  });

  test('Add new Article test', async ({ page }) => {
    // Arrange
    const title = `${newArticleData.title}${await utility.generateRandomValue()}`;
    const expectedAlert = `Article was created`;
    // Act
    await articlesPage.addArticle();
    await addArticlesPage.setTitle(title);
    await addArticlesPage.setBody(newArticleData.body);
    await addArticlesPage.saveArticle();
    // Assert
    await expect(utility.alertPopUp).toHaveText(expectedAlert);
    await expect(articleProfilPage.titleValue).toHaveText(title);
    await expect(articleProfilPage.bodyValue).toHaveText(newArticleData.body);
  });
});
