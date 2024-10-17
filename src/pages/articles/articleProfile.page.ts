import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}
export class ArticleProfilePage {
  readonly page: Page;
  readonly titleValue: Locator;
  readonly bodyValue: Locator;
  readonly deleteIcon: Locator;
  readonly addCommentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleValue = page.getByTestId('article-title');
    this.bodyValue = page.getByTestId('article-body');
    this.deleteIcon = page.getByTestId('delete');
    this.addCommentButton = page.locator('#add-new-comment');
  }

  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    this.deleteIcon.click();
  }

  getArticleComment(body: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });
    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
}
