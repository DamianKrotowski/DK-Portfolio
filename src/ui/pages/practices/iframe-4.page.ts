import { FrameLocator, Locator, Page } from '@playwright/test';

export class Iframe4Page {
  readonly page: Page;
  readonly usernameInputFrame: Locator;
  readonly passwordInputFrame: Locator;
  readonly submitButtonFrame: Locator;
  readonly resultTextFrame: Locator;
  readonly frame: FrameLocator;
  readonly innerIframe: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    const frame = page.locator('#register-iframe').contentFrame();
    const innerIframe = frame.locator('#inner-iframe').contentFrame();

    this.usernameInputFrame = innerIframe.getByTestId('username-input');
    this.passwordInputFrame = innerIframe.getByTestId('password-input');
    this.submitButtonFrame = innerIframe.getByTestId('register-submit');
    this.resultTextFrame = innerIframe.getByTestId('register-results');
  }
}
