import { Page } from '@playwright/test';

export class MyProfilePage {
  constructor(private page: Page) {}

  editButton = this.page.locator('.fas.fa-edit.edit');
  firstNameValue = this.page.getByTestId('firstname');
  lastNameValue = this.page.getByTestId('lastname');
  emailValue = this.page.getByTestId('email');

  myProfilButton = this.page.getByRole('button', { name: 'My profile' });

  async goToEditMyProfil(): Promise<void> {
    await this.editButton.click();
  }
}
