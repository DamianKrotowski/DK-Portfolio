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
  async setFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(LastName: string): Promise<void> {
    await this.lastNameInput.fill(LastName);
  }

  async setEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async setAvatar(avatar: string): Promise<void> {
    await this.avatarInput.fill(avatar);
  }

  async setChangePassword(): Promise<void> {
    await this.editPasswordCheckbox.click();
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async updateProfile(): Promise<void> {
    await this.updateButton.click();
  }

  async cancelUpdateProfile(): Promise<void> {
    await this.cancelButton.click();
  }
}
