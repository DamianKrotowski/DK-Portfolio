import { regularUserData } from '../../src/testdata/user.data';
import { newArticleData } from '../../src/testdata/articles.data';
import { expect, test } from '../../src/pages/gadPageObjects';

test.describe('Articles tests', () => {
  test(
    'Add new Article test',
    { tag: '@Article' },
    async ({
      page,
      loginPage,
      navigationPage,
      utility,
      articlesPage,
      addArticlesPage,
      articleProfilePage,
    }) => {
      const expectedAlert = `Article was created`;
      const title = `${
        newArticleData.title
      }${await utility.generateRandomValue()}`;

      await page.goto('/');
      await navigationPage.goToLogin();
      await loginPage.login(regularUserData.email, regularUserData.password);
      await navigationPage.goToArticles();
      await articlesPage.addArticle();
      await addArticlesPage.setTitle(title);
      await addArticlesPage.setBody(newArticleData.body);
      await addArticlesPage.saveArticle();

      await expect(utility.alertPopUp).toHaveText(expectedAlert);
      await expect(articleProfilePage.titleValue).toHaveText(title);
      await expect(articleProfilePage.bodyValue).toHaveText(
        newArticleData.body,
      );
    },
  );
});
