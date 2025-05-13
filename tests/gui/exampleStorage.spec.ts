import { expect } from '@playwright/test';
import { test } from 'src/ui/pages/storageState.fixture';

test.describe('StorageState', () => {
  test('should login with storageState', async ({ storageState, page }) => {
    await storageState;
    const helloHeaderLocator = page.getByTestId('hello');

    await page.goto('/welcome/');

    await expect(helloHeaderLocator).toBeVisible();
  });
});
