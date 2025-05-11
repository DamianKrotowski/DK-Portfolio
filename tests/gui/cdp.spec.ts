import { expect, test } from '@_pages/gadPageObjects.fixture';
import { NETWORK_PRESETS } from '@_testdata/networkPreSet.data';

test.describe('CDP communication', () => {
  test(`Emulate network throttle`, async ({
    context,
    page,
    randomWeatherV2Page,
  }) => {
    const cdpSession = await context.newCDPSession(page);
    // https://chromedevtools.github.io/devtools-protocol/tot/Network/
    await cdpSession.send(
      'Network.emulateNetworkConditions',
      NETWORK_PRESETS.slow3GConditions,
    );

    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await page.waitForLoadState('domcontentloaded');
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeVisible();
    await page.close();
  });
  test(`Script Execution Disabled`, async ({
    context,
    page,
    randomWeatherV2Page,
  }) => {
    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send('Emulation.setScriptExecutionDisabled', {
      value: true,
    });

    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeHidden();
    await page.close();
  });
  test(`Performance metrics`, async ({
    context,
    page,
    randomWeatherV2Page,
  }) => {
    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send('Performance.enable');

    await page.goto(
      `${process.env.SECONDARDY_URL}/practice/random-weather-v2.html`,
    );
    await randomWeatherV2Page.getWeatherButton.click();

    await expect(randomWeatherV2Page.ResultTable).toBeVisible();
    const metrics = await cdpSession.send('Performance.getMetrics');
    // eslint-disable-next-line no-console
    console.log(metrics.metrics);
    await page.close();
  });
});
