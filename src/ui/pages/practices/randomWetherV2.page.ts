import { Locator, Page } from '@playwright/test';

export class RandomWeatherV2Page {
  readonly page: Page;
  readonly ResultTable: Locator;
  readonly getWeatherButton: Locator;
  readonly meanTemperatureText: Locator;
  readonly getOneDayFromPastText: Locator;
  readonly errorMessageText: Locator;
  readonly selectCityText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ResultTable = page.getByTestId('results-table');
    this.getWeatherButton = page.getByTestId('get-weather');
    this.meanTemperatureText = page.getByTestId('dti-meanTemperature');
    this.getOneDayFromPastText = page.getByTestId('get-weather-past-day');
    this.errorMessageText = page.getByTestId('error-message');
    this.selectCityText = page.getByTestId('city');
  }
}
