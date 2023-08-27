import { Page } from "@playwright/test";

export class WelcomePage {
  constructor(private page: Page) {}

  logoutButton = this.page.getByTestId("logoutButton");
  myProfilButton = this.page.getByRole("button", { name: "My profile" });

  async logoutAfterLogin(): Promise<void> {
    await this.logoutButton.click();
  }

  async goToMyProfil(): Promise<void> {
    await this.myProfilButton.click();
  }
}
