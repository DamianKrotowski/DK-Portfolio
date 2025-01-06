import { expect, test } from '@playwright/test';
test.describe('Test Weather Data - filter responses by code and text', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      `${process.env.BASE_URL_MOCKED_TESTS}/practice/random-weather-v2.html`,
    );
  });
  test('mock responses for weather with 404', async ({ page }) => {
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const errorMessageSelector = 'error-message';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);
    const errorMessageLocator = page.getByTestId(errorMessageSelector);

    await page.route(
      `${process.env.BASE_URL_MOCKED_TESTS}/api/v1/data/random/weather-simple`,
      async (route) => {
        await route.fulfill({ status: 404, body: 'Not Found!' });
      },
    );

    await getWeatherButtonLocator.click();

    await expect.soft(weatherTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();
  });
  test('mock responses for Warsaw in response', async ({ page }) => {
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const errorMessageSelector = 'error-message';
    const selectCitySelector = 'city';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);
    const errorMessageLocator = page.getByTestId(errorMessageSelector);
    const selectCityLocator = page.getByTestId(selectCitySelector);

    await page.route(
      `${process.env.BASE_URL_MOCKED_TESTS}/api/v1/data/random/weather-simple`,
      async (route) => {
        if (route.request().postData()?.includes('Warsaw')) {
          await route.fulfill({ status: 404, body: 'Not Found!' });
        } else {
          await route.continue();
        }
      },
    );

    await getWeatherButtonLocator.click();

    await expect.soft(weatherTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();

    await selectCityLocator.selectOption({ value: 'Berlin' });
    await getWeatherButtonLocator.click();

    await expect.soft(weatherTableLocator).toBeVisible();
    await expect.soft(errorMessageLocator).toBeHidden();
  });
});
