import { expect, test } from 'src/ui/fixture/gadPageObjects.fixture';
test.describe('Test iframes', () => {
  test('submit data in iframe', async ({ page, iframe1Page }) => {
    await page.goto(`${process.env.SECONDARDY_URL}/practice/iframe-0.html`);
    const inputText = 'John Doe';
    const expectedText = `Hello, ${inputText}!`;

    await iframe1Page.nameInputFrame.fill(inputText);
    await iframe1Page.submitButtonFrame.click();

    await expect(iframe1Page.resultsTextFrame).toHaveText(expectedText);
  });

  test('submit registration data in nested iframe', async ({
    page,
    iframe4Page,
  }) => {
    await page.goto(`${process.env.SECONDARDY_URL}/practice/iframe-4.html`);
    const username = 'John Doe';
    const password = '12345678';

    const expectedText = `Registration successful! Username: ${username}, Age: 18, Password: ********`;

    await iframe4Page.usernameInputFrame.fill(username);
    await iframe4Page.passwordInputFrame.fill(password);
    await iframe4Page.submitButtonFrame.click();

    await expect(iframe4Page.resultTextFrame).toHaveText(expectedText);
  });
});
