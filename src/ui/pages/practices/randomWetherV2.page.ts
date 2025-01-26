import { Locator, Page } from '@playwright/test';

export class RandomWeatherV2Page {
  readonly page: Page;
  readonly ResultTable: Locator;
  readonly getWeatherButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ResultTable = page.getByTestId('results-table');
    this.getWeatherButton = page.getByTestId('get-weather');
  }
}
