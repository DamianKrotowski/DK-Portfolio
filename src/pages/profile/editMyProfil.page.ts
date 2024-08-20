import { Locator, Page } from '@playwright/test';

export class EditMyProfilePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly avatarInput: Locator;
  readonly editPasswordCheckbox: Locator;
  readonly passwordInput: Locator;
  readonly updateButton: Locator;
  readonly passwordErrorMsg: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstname-input');
    this.lastNameInput = page.getByTestId('lastname-input');
    this.emailInput = page.getByTestId('email-input');
    this.avatarInput = page.locator('#container #avatar');
    this.editPasswordCheckbox = page.locator('#editPassword');
    this.passwordInput = page.locator('#password');
    this.updateButton = page.getByTestId('update-user');
    this.passwordErrorMsg = page.getByText('This field is required');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }
}
