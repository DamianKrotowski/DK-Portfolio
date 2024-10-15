import { Locator, Page } from '@playwright/test';

export class ArticlesPage {
  readonly page: Page;
  readonly addArticleButton: Locator;
  readonly uploadButton: Locator;
  readonly goButton: Locator;
  readonly searchInput: Locator;
  readonly noResultText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addArticleButton = page.getByRole('button', { name: 'Add Article' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.goButton = page.getByTestId('search-button');
    this.searchInput = page.getByTestId('search-input');
    this.noResultText = page.getByTestId('no-results');
  }

  async goToArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }

  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }
}
