import { AddArticleModel } from '@_models/article.model';
import { Locator, Page } from '@playwright/test';

export class AddArticlesView {
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

  async createArticle(addArticle: AddArticleModel): Promise<void> {
    await this.addTitleInput.fill(addArticle.title);
    await this.addBodyInput.fill(addArticle.body);
    await this.saveButton.click();
  }
}
