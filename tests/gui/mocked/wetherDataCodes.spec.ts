import { expect, test } from 'src/ui/fixture/gadPageObjects.fixture';
test.describe('Test Weather Data - filter responses by code and text', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
  });
  test('mock responses for weather with 404', async ({
    page,
    randomWeatherV2Page,
  }) => {
    await page.route(
      `${process.env.SECONDARDY_URL}/api/v1/data/random/weather-simple`,
      async (route) => {
        await route.fulfill({ status: 404, body: 'Not Found!' });
      },
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect.soft(randomWeatherV2Page.ResultTable).toBeHidden();
    await expect.soft(randomWeatherV2Page.errorMessageText).toBeVisible();
  });
  test('mock responses for Warsaw in response', async ({
    page,
    randomWeatherV2Page,
  }) => {
    await page.route(
      `${process.env.SECONDARDY_URL}/api/v1/data/random/weather-simple`,
      async (route) => {
        if (route.request().postData()?.includes('Warsaw')) {
          await route.fulfill({ status: 404, body: 'Not Found!' });
        } else {
          await route.continue();
        }
      },
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect.soft(randomWeatherV2Page.ResultTable).toBeHidden();
    await expect.soft(randomWeatherV2Page.errorMessageText).toBeVisible();

    await randomWeatherV2Page.selectCityText.selectOption({ value: 'Berlin' });
    await randomWeatherV2Page.getWeatherButton.click();

    await expect.soft(randomWeatherV2Page.ResultTable).toBeVisible();
    await expect.soft(randomWeatherV2Page.errorMessageText).toBeHidden();
  });
});
