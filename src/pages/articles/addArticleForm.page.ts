import { Locator, Page } from '@playwright/test';

export class AddArticlesPage {
  readonly page: Page;
  readonly addTitleInput: Locator;
  readonly addBodyInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addTitleInput = page.getByTestId('title-input');
    this.addBodyInput = page.getByTestId('body-text');
    this.saveButton = page.getByTestId('save');
  }
}
