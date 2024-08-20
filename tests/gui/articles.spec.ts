import { regularUserData } from '@_testdata/user.data';
import { newArticleData } from '@_testdata/articles.data';
import { expect, test } from '@_pages/gadPageObjects';

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
      await navigationPage.articlesButton.click();
      await articlesPage.addArticleButton.click();
      await addArticlesPage.addTitleInput.fill(title);
      await addArticlesPage.addBodyInput.fill(newArticleData.body);
      await addArticlesPage.saveButton.click();

      await expect(utility.alertPopUp).toHaveText(expectedAlert);
      await expect(articleProfilePage.titleValue).toHaveText(title);
      await expect(articleProfilePage.bodyValue).toHaveText(
        newArticleData.body,
      );
    },
  );
});
