import { expect, test } from '@playwright/test';
test.describe('Abort requests', () => {
  test('abort all weather data requests', async ({ page }) => {
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.goto(
      `${process.env.BASE_URL_MOCKED_TESTS}/practice/random-weather-v2.html`,
    );

    await page.route(
      '*/**/api/v1/data/random/weather-simple',
      async (route) => {
        await route.abort();
      },
    );

    await getWeatherButtonLocator.click();

    await expect(weatherTableLocator).toBeHidden();
  });
  test('abort all images', async ({ page }) => {
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.route(/(\.png$)|(\.jpg$)/, async (route) => await route.abort());
    await page.goto(
      `${process.env.BASE_URL_MOCKED_TESTS}/practice/random-weather-v2.html`,
    );

    await getWeatherButtonLocator.click();

    await expect(weatherTableLocator).toBeVisible();
  });
  test('abort all requests for styles', async ({ page }) => {
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.route(/(\.css)/, async (route) => {
      await route.abort();
    });
    await page.goto(
      `${process.env.BASE_URL_MOCKED_TESTS}/practice/random-weather-v2.html`,
    );

    await getWeatherButtonLocator.click();

    await expect(weatherTableLocator).toBeVisible();
  });
});
