import { expect, test } from '@playwright/test';
test.describe('Test Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL_MOCKED_TESTS);
  });
  test('total cost', async ({ page }) => {
    const shippingCostSelector = 'shipping-cost';
    const taxCostSelector = 'tax-cost';
    const totalCostSelector = 'total-cost';
    const shippingCostLocator = page.getByTestId(shippingCostSelector);
    const taxCostLocator = page.getByTestId(taxCostSelector);
    const totalCostLocator = page.getByTestId(totalCostSelector);
    const expectedTotalCost = '240.00';
    const expectedShippingCost = '20.00';
    const expectedTaxCost = '20.00';

    await page.route(
      `${process.env.BASE_URL_MOCKED_TESTS}/api/v1/data/random/ecommerce-shopping-cart-simple`,
      async (route) => {
        await route.fulfill({ json: mockedApiFullResponse });
      },
    );

    await page.goto(
      `${process.env.BASE_URL_MOCKED_TESTS}/practice/random-shopping-cart-v1.html`,
    );

    await expect.soft(totalCostLocator).toHaveText(expectedTotalCost);
    await expect.soft(shippingCostLocator).toHaveText(expectedShippingCost);
    await expect.soft(taxCostLocator).toHaveText(expectedTaxCost);
  });
  test('invalid product quantity and subtotal', async ({ page }) => {
    const shippingCostSelector = 'shipping-cost';
    const taxCostSelector = 'tax-cost';
    const totalCostSelector = 'total-cost';
    const shippingCostLocator = page.getByTestId(shippingCostSelector);
    const taxCostLocator = page.getByTestId(taxCostSelector);
    const totalCostLocator = page.getByTestId(totalCostSelector);
    const expectedTotalCost = '48.00';
    const expectedShippingCost = '4.00';
    const expectedTaxCost = '4.00';

    await page.route(
      `${process.env.BASE_URL_MOCKED_TESTS}/api/v1/data/random/ecommerce-shopping-cart-simple`,
      async (route) => {
        await route.fulfill({ json: mockedApiResponseZeroQuantityAndSubtotal });
      },
    );

    await page.goto(
      `${process.env.BASE_URL_MOCKED_TESTS}/practice/random-shopping-cart-v1.html`,
    );

    await expect.soft(totalCostLocator).toHaveText(expectedTotalCost);
    await expect.soft(shippingCostLocator).toHaveText(expectedShippingCost);
    await expect.soft(taxCostLocator).toHaveText(expectedTaxCost);
  });
});

const mockedApiFullResponse = {
  cartItems: [
    {
      product: {
        id: 24,
        name: 'Shaver',
        price: 80,
        icon: '🪒',
      },
      quantity: 2,
      subtotal: 160,
    },
    {
      product: {
        id: 29,
        name: 'Conditioner',
        price: 4,
        icon: '🧴',
      },
      quantity: 10,
      subtotal: 40,
    },
  ],
};
const mockedApiResponseZeroQuantityAndSubtotal = {
  cartItems: [
    {
      product: {
        id: 24,
        name: 'Shaver',
        price: 80,
        icon: '🪒',
      },
      quantity: 0,
      subtotal: 0,
    },
    {
      product: {
        id: 29,
        name: 'Conditioner',
        price: 4,
        icon: '🧴',
      },
      quantity: 10,
      subtotal: 40,
    },
  ],
};
