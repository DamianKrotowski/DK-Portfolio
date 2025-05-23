import { prepareRandomNewArticle } from '@_factories/article.factory';
import { prepareRandomNewComment } from '@_factories/comment.factory';
import { AddArticleModel } from '@_models/article.model';
import { primaryUserData } from '@_testdata/user.data';
import { expect } from '@playwright/test';
import { test } from 'src/ui/fixture/gadPageObjects.fixture';

test.describe('Create, verify and delete comment', () => {
  let articleData: AddArticleModel;
  test.beforeEach(
    async ({
      page,
      navigationPage,
      loginPage,
      articlesPage,
      addArticlesView,
    }) => {
      articleData = prepareRandomNewArticle();

      await page.goto('/');
      await navigationPage.goToLogin();
      await loginPage.login(primaryUserData);
      await navigationPage.articlesButton.click();
      await articlesPage.addArticleButton.click();
      await addArticlesView.createArticle(articleData);
    },
  );

  test(
    'create new comment',
    { tag: '@smoke' },
    async ({
      utility,
      articleProfilePage,
      addCommentView,
      commentPage,
      editCommentView,
    }) => {
      const expectedCreatePopup = `Comment was created`;
      const expectedUpdatePopup = `Comment was updated`;
      const newCommentData = prepareRandomNewComment();
      const editCommentData = prepareRandomNewComment();

      await articleProfilePage.addCommentButton.click();
      await addCommentView.bodyInput.fill(newCommentData.body);
      await addCommentView.saveButton.click();
      await expect(utility.alertPopUp).toHaveText(expectedCreatePopup);

      const articleComment = articleProfilePage.getArticleComment(
        newCommentData.body,
      );
      await expect(articleComment.body).toHaveText(newCommentData.body);

      await articleComment.link.click();
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);

      await commentPage.editButton.click();
      await editCommentView.bodyInput.fill(editCommentData.body);
      await editCommentView.updateButton.click();
      await expect(utility.alertPopUp).toHaveText(expectedUpdatePopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);

      await commentPage.returnLink.click();
      const updatedArticleComment = articleProfilePage.getArticleComment(
        editCommentData.body,
      );
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    },
  );
});
