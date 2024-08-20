import { Locator, Page } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

export class Utility {
  readonly page: Page;
  readonly alertPopUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertPopUp = page.getByTestId('alert-popup');
  }
  async generateRandomValue(): Promise<number> {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  async randomEmail(): Promise<string> {
    const uniqueId = uuidv4(); // Generate a random UUID
    const email = `email${uniqueId}@gmail.com`;
    return email;
  }
}
