import { Page } from '@playwright/test';

export class EditMyProfilePage {
  constructor(private page: Page) {}

  firstNameInput = this.page.getByTestId('firstname-input');
  lastNameInput = this.page.getByTestId('lastname-input');
  emailInput = this.page.getByTestId('email-input');
  avatarInput = this.page.locator('#container #avatar');
  editPasswordCheckbox = this.page.locator('#editPassword');
  passwordInput = this.page.locator('#password');
  updateButton = this.page.getByTestId('update-user');
  passwordErrorMsg = this.page.getByText('This field is required');
  cancelButton = this.page.getByRole('button', { name: 'Cancel' });

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

  async cancelupdateProfile(): Promise<void> {
    await this.cancelButton.click();
  }
}
