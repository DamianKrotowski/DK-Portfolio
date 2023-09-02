import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { regularUserData } from '../../src/testdata/user.data';
import { NavigationPage } from '../../src/components/navbar';
import { Utility } from '../../src/pages/utility.page';
import { newArticleData } from '../../src/testdata/articles.data';
import { ArticlesPage } from '../../src/pages/articles/articles.page';
import { AddArticlesPage } from '../../src/pages/articles/addArticleForm.page';
import { ArticleProfilPage } from '../../src/pages/articles/articleProfile.page';

test.describe('Articles tests', () => {
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;
  let utility: Utility;
  let articlesPage: ArticlesPage;
  let addArticlesPage: AddArticlesPage;
  let articleProfilPage: ArticleProfilPage;

  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    loginPage = new LoginPage(page);
    utility = new Utility(page);
    articlesPage = new ArticlesPage(page);
    addArticlesPage = new AddArticlesPage(page);
    articleProfilPage = new ArticleProfilPage(page);

    await page.goto('/');
    await navigationPage.goToLogin();
    await loginPage.login(regularUserData.email, regularUserData.password);
    await navigationPage.goToArticles();
  });

  test('Add new Article test', async ({ page }) => {
    // Arrange
    const title = `${
      newArticleData.title
    }${await utility.generateRandomValue()}`;
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
