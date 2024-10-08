import { Locator, Page } from '@playwright/test';

export class ArticlesPage {
  readonly page: Page;
  readonly addArticleButton: Locator;
  readonly uploadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addArticleButton = page.getByRole('button', { name: 'Add Article' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
  }
}
