import { Page } from '@playwright/test';

export class ArticlesPage {
  constructor(private page: Page) {}

  addArticleButton = this.page.getByRole('button', { name: 'Add Article' });
  uploadButton = this.page.getByRole('button', { name: 'Upload' });

  async addArticle(): Promise<void> {
    await this.addArticleButton.click();
  }

  async upload(): Promise<void> {
    await this.uploadButton.click();
  }
}
