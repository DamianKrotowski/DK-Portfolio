import { Locator, Page } from '@playwright/test';

export class AddCommentView {
  readonly page: Page;
  readonly bodyInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bodyInput = page.locator('#body');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }
}
