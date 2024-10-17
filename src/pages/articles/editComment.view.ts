import { Locator, Page } from '@playwright/test';

export class EditCommentView {
  readonly page: Page;
  readonly bodyInput: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bodyInput = page.locator('#body');
    this.updateButton = page.getByTestId('update-button');
  }
}
