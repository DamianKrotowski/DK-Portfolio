import { prepareRandomNewArticle } from '@_factories/article.factory';
import { expect, test } from '@_pages/gadPageObjects.fixture';
import { primaryUserData } from '@_testdata/user.data';

test.describe('Articles tests', () => {
  test.beforeEach(async ({ page, navigationPage, loginPage, articlesPage }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await navigationPage.goToLogin();
    await loginPage.login(primaryUserData);
    await navigationPage.articlesButton.click();
    await articlesPage.addArticleButton.click();
  });

  test(
    'create new article',
    { tag: '@smoke' },
    async ({ utility, addArticlesView, articleProfilePage }) => {
      const expectedAlert = `Article was created`;
      const articleData = prepareRandomNewArticle();

      await addArticlesView.createArticle(articleData);

      await expect(utility.alertPopUp).toHaveText(expectedAlert);
      await expect(articleProfilePage.titleValue).toHaveText(articleData.title);
      await expect(articleProfilePage.bodyValue).toHaveText(articleData.body, {
        useInnerText: true,
      });
    },
  );

  test('reject creating article without title', async ({
    utility,
    addArticlesView,
  }) => {
    const expectedErrorMessage = `Article was not created`;
    const articleData = prepareRandomNewArticle();
    articleData.title = '';

    await addArticlesView.createArticle(articleData);

    await expect(utility.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body', async ({
    utility,
    addArticlesView,
  }) => {
    const expectedErrorMessage = `Article was not created`;
    const articleData = prepareRandomNewArticle();
    articleData.body = '';

    await addArticlesView.createArticle(articleData);

    await expect(utility.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test('reject creating article with title exceeding 128 signs', async ({
    utility,
    addArticlesView,
  }) => {
    const expectedErrorMessage = `Article was not created`;
    const articleData = prepareRandomNewArticle(129);

    await addArticlesView.createArticle(articleData);

    await expect(utility.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test('user can access single article', async ({
    articlesPage,
    addArticlesView,
    articleProfilePage,
  }) => {
    const articleData = prepareRandomNewArticle();

    await addArticlesView.createArticle(articleData);
    await articlesPage.goToArticle(articleData.title);

    await expect(articleProfilePage.titleValue).toHaveText(articleData.title);
    await expect(articleProfilePage.bodyValue).toHaveText(articleData.body, {
      useInnerText: true,
    });
  });
});
