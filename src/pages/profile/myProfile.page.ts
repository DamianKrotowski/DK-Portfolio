import { Locator, Page } from '@playwright/test';

export class MyProfilePage {
  readonly page: Page;
  readonly editButton: Locator;
  readonly emailInput: Locator;
  readonly lastNameValue: Locator;
  readonly emailValue: Locator;
  readonly myProfileButton: Locator;
  readonly firstNameValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editButton = page.locator('.fas.fa-edit.edit');
    this.lastNameValue = page.getByTestId('lastname');
    this.emailValue = page.getByTestId('email');
    this.firstNameValue = page.getByTestId('firstname');
    this.myProfileButton = page.getByRole('button', { name: 'My profile' });
  }
}
