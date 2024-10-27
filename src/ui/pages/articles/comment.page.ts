import { Locator, Page } from '@playwright/test';

export class CommentPage {
  readonly page: Page;
  readonly commentBody: Locator;
  readonly editButton: Locator;
  readonly returnLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentBody = page.getByTestId('comment-body');
    this.editButton = page.getByTestId('edit');
    this.returnLink = page.getByTestId('return');
  }
}
