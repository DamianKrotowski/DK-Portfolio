import { primaryUserData } from '@_testdata/user.data';
import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import { SESSION_PATH } from 'playwright.config';
// type MyFixtures = {
//   loggedInPage: Page;
// };

// export const test = baseTest.extend<MyFixtures>({
//   loggedInPage: async ({ page }, use) => {
//     const SESSION_PATH = path.join(__dirname, './.auth/user.json');

//     if (fs.existsSync(SESSION_PATH)) {
//       await use(SESSION_PATH);
//       return;
//     }

//     await page.goto('/login/');
//     // Act:
//     await page.locator('[name="username"]').fill(primaryUserData.userEmail);
//     await page.locator('#password').fill(primaryUserData.userPassword);
//     await page.locator('#loginButton').click();
//     // Assert:
//     await expect(page.getByTestId('hello')).toBeVisible();
//     await page.context().storageState({ path: SESSION_PATH });
//     await use(page);
//   },
// });

// export const test = baseTest.extend<
//   { Fixture: unknown; loggedInPage: Page },
//   { SESSION_PATH: string }
// >({
//   loggedInPage: async (
//     { page }: { page: Page },
//     use: (page: Page) => Promise<void>,
//   ) => {
//     const SESSION_PATH = path.join(__dirname, './.auth/user.json');

//     if (fs.existsSync(SESSION_PATH)) {
//       await use(SESSION_PATH);
//       return;
//     }

//     await page.goto('/login/');
//     // Act:
//     await page.locator('[name="username"]').fill(primaryUserData.userEmail);
//     await page.locator('#password').fill(primaryUserData.userPassword);
//     await page.locator('#loginButton').click();
//     // Assert:
//     await expect(page.getByTestId('hello')).toBeVisible();
//     await page.context().storageState({ path: SESSION_PATH });
//     await use(page);
//   },
// });

export const test = baseTest.extend<
  { Fixture: unknown },
  { workerStorageState: string }
>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use): Promise<void> => {
      if (fs.existsSync(SESSION_PATH)) {
        await use(SESSION_PATH);
        return;
      }
      const page = await browser.newPage({ storageState: undefined });
      await page.goto(`${process.env.BASE_URL}/login/`);
      // Act:
      await page.locator('[name="username"]').fill(primaryUserData.userEmail);
      await page.locator('#password').fill(primaryUserData.userPassword);
      await page.locator('#loginButton').click();
      // Assert:
      await expect(page.getByTestId('hello')).toBeVisible();
      await page.context().storageState({ path: SESSION_PATH });
      await use(SESSION_PATH);
    },
    { scope: 'worker' },
  ],
});
