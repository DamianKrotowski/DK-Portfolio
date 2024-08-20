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
  async setTitle(title: string): Promise<void> {
    await this.addTitleInput.fill(title);
  }

  async setBody(body: string): Promise<void> {
    await this.addBodyInput.fill(body);
  }

  async saveArticle(): Promise<void> {
    await this.saveButton.click();
  }
}
