import { Page } from '@playwright/test';
import { v4 as uuidv4 } from "uuid";

export class Utility {
  constructor(private page: Page) {}

  alertPopUp = this.page.getByTestId('alert-popup');

  async generateRandomValue(): Promise<number> {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  async randomEmail(): Promise<string> {
    const uniqueId = uuidv4(); // Generate a random UUID
    const email = `email${uniqueId}@gmail.com`;
    return email;
  }
}
