import { Page } from "@playwright/test";

export class AddArticlesPage {
  constructor(private page: Page) {}

  addTitleInput = this.page.getByTestId('title-input');
  addBodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');

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
