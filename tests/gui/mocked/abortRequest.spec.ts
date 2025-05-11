import { expect, test } from '@_pages/gadPageObjects.fixture';
test.describe('Abort requests', () => {
  test('abort all weather data requests', async ({
    page,
    randomWeatherV2Page,
  }) => {
    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );

    await page.route(
      '*/**/api/v1/data/random/weather-simple',
      async (route) => {
        await route.abort();
      },
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeHidden();
  });
  test('abort all images', async ({ page, randomWeatherV2Page }) => {
    await page.route(/(\.png$)|(\.jpg$)/, async (route) => await route.abort());
    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeVisible();
  });
  test('abort all requests for styles', async ({
    page,
    randomWeatherV2Page,
  }) => {
    await page.route(/(\.css)/, async (route) => {
      await route.abort();
    });
    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeVisible();
  });
});
