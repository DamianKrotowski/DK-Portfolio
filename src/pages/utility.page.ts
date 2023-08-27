import { Page } from '@playwright/test';

export class Utility {
  constructor(private page: Page) {}

  alertPopUp = this.page.getByTestId('alert-popup');

  async generateRandomValue(): Promise<number> {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  async randomEmail(): Promise<string> {
    const randomValue = await this.generateRandomValue();
    return `email${randomValue}@gmail.com`;
  }
}
