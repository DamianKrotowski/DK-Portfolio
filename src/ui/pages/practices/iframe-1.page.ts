import { FrameLocator, Locator, Page } from '@playwright/test';

export class Iframe1Page {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly nameInputFrame: Locator;
  readonly submitButtonFrame: Locator;
  readonly resultsTextFrame: Locator;

  constructor(page: Page) {
    this.page = page;
    const frame = page.locator('#simple-iframe').contentFrame();

    this.nameInputFrame = frame.getByTestId('name-input');
    this.submitButtonFrame = frame.getByTestId('submit');
    this.resultsTextFrame = frame.getByTestId('results');
  }
}
