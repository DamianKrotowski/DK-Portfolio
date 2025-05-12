import { prepareRandomNewArticle } from '@_factories/article.factory';
import { AddArticleModel } from '@_models/article.model';
import { primaryUserData } from '@_testdata/user.data';
import { expect, test } from 'src/ui/fixture/gadPageObjects.fixture';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  let articleData: AddArticleModel;
  test.beforeEach(async ({ page, navigationPage, loginPage }) => {
    await page.goto('/');
    await navigationPage.goToLogin();
    await loginPage.login(primaryUserData);
    await navigationPage.articlesButton.click();
  });

  test(
    'create new article',
    { tag: '@smoke' },
    async ({ utility, addArticlesView, articleProfilePage, articlesPage }) => {
      const expectedAlert = `Article was created`;
      articleData = prepareRandomNewArticle();

      await articlesPage.addArticleButton.click();
      await addArticlesView.createArticle(articleData);

      await expect(utility.alertPopUp).toHaveText(expectedAlert);
      await expect(articleProfilePage.titleValue).toHaveText(articleData.title);
      await expect(articleProfilePage.bodyValue).toHaveText(articleData.body, {
        useInnerText: true,
      });
    },
  );

  test('user can access single article', async ({
    articleProfilePage,
    articlesPage,
  }) => {
    await articlesPage.goToArticle(articleData.title);

    await expect(articleProfilePage.titleValue).toHaveText(articleData.title);
    await expect(articleProfilePage.bodyValue).toHaveText(articleData.body, {
      useInnerText: true,
    });
  });

  test('user can delete his own article', async ({
    articleProfilePage,
    articlesPage,
  }) => {
    const noResultText = 'No data';

    await articlesPage.goToArticle(articleData.title);
    await articleProfilePage.deleteArticle();
    await articlesPage.searchInput.fill(articleData.title);
    await articlesPage.goButton.click();

    await expect(articlesPage.noResultText).toContainText(noResultText);
  });
});
