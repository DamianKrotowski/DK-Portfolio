import { Locator, Page } from '@playwright/test';
export class ArticleProfilePage {
  readonly page: Page;
  readonly titleValue: Locator;
  readonly bodyValue: Locator;
  readonly deleteIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleValue = page.getByTestId('article-title');
    this.bodyValue = page.getByTestId('article-body');
    this.deleteIcon = page.getByTestId('delete');
  }
}
