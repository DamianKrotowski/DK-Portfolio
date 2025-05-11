import { Locator, Page } from '@playwright/test';

export class ShopingCartV1Page {
  readonly page: Page;
  readonly shippingCostText: Locator;
  readonly taxCostText: Locator;
  readonly totalCostText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.shippingCostText = page.getByTestId('shipping-cost');
    this.taxCostText = page.getByTestId('tax-cost');
    this.totalCostText = page.getByTestId('total-cost');
  }
}
