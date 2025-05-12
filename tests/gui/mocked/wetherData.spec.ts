import { expect, test } from '@_pages/gadPageObjects.fixture';
test.describe('Test weather data', () => {
  test('get weather data and present table to user', async ({
    page,
    randomWeatherV2Page,
  }) => {
    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeVisible();
  });
  test('weather mean temperature calculation', async ({
    page,
    randomWeatherV2Page,
  }) => {
    const expectedMeanTemperature = '22.67';

    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await page.route(
      `${process.env.SECONDARDY_URL}/api/v1/data/random/weather-simple`,
      async (route) => {
        await route.fulfill({ json: mockedWeatherApiBaseResponse });
      },
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.meanTemperatureText).toHaveText(
      expectedMeanTemperature,
    );
  });
  test('weather mean temperature calculation with one day from past', async ({
    page,
    randomWeatherV2Page,
  }) => {
    const expectedMeanTemperature = '22.67';
    const expectedMeanTemperatureWithOneDayFromPast = '25.50';

    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await page.route(
      `${process.env.SECONDARDY_URL}/api/v1/data/random/weather-simple`,
      async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({ json: mockedWeatherApiBaseResponse });
        } else {
          await route.fulfill({ json: mockedWeatherApiOneDayResponse });
        }
      },
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.meanTemperatureText).toHaveText(
      expectedMeanTemperature,
    );

    await randomWeatherV2Page.getOneDayFromPastText.click();

    await expect(randomWeatherV2Page.meanTemperatureText).toHaveText(
      expectedMeanTemperatureWithOneDayFromPast,
    );
  });
});
const mockedWeatherApiBaseResponse = [
  {
    date: '2024-12-13',
    city: 'Warsaw',
    temperature: 27,
    temperatureMin: 27,
    temperatureMax: 30,
    humidity: '71%',
    dayLength: 15,
    windSpeed: 90,
    windSpeedRange: '40+ km/h',
  },
  {
    date: '2024-12-12',
    city: 'Warsaw',
    temperature: 21,
    temperatureMin: -6,
    temperatureMax: 42,
    humidity: '32%',
    dayLength: 15,
    windSpeed: 4,
    windSpeedRange: '0-5 km/h',
  },
  {
    date: '2024-12-11',
    city: 'Warsaw',
    temperature: 20,
    temperatureMin: 8,
    temperatureMax: 31,
    humidity: '62%',
    dayLength: 15,
    windSpeed: 0,
    windSpeedRange: '0-5 km/h',
  },
];
const mockedWeatherApiOneDayResponse = [
  {
    date: '2024-12-10',
    city: 'Warsaw',
    temperature: 34,
    temperatureMin: 28,
    temperatureMax: 41,
    humidity: '36%',
    dayLength: 19,
    windSpeed: 0,
    windSpeedRange: '0-5 km/h',
  },
];
