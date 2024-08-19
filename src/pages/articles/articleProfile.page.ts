import { Page } from '@playwright/test';
import { newArticleData } from '@_testdata/articles.data';
import { Utility } from '@_pages/utility.page';

export class ArticleProfilePage {
  constructor(private page: Page) {}

  titleValue = this.page.getByTestId('article-title');
  bodyValue = this.page.getByTestId('article-body');
}
