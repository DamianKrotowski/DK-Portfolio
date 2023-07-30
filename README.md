# Introduction 
This is a Test Automation project based on 'Playwright' and 'TypeScript'.

# About tests


## Commands

- check 'NodeJS' version:
'node -v'
- record tests for given site:
'npx playwright codegen https://groovy-chartreuse-ocelot.glitch.me'
- run tests without browser GUI:
'npx playwright test'
- run tests with browser GUI:
'npx playwright test --headed'

## Updating Playwright
- check if Playwright should be updated:
'npm outdated @playwright/test'
- update Playwright:
'npm i @playwright/test'
- update browsers:
'npx playwright install'
- verify Playwright version:
'npx @playwright/test --verson'

## Playwright Config Modifications

- config file 'playwright.config.ts'
- disable browser, i.e. Firefox
'''javascript
<!-- {
    name: 'firefox',
    use {
        ...devices['Desktop Firefox'],
    },
}, -->
'''
- enable video on fail
'''javascript
use: {
    video: { 'retain-on-failure'},
},
'''
- enable Trace Viewer on fail
'''javascript
use: {
    trace: { 'retain-on-failure'},
},
'''

### Playwright snippets

- import:
'''typescript
import { test, expect } from @playwright/test';
'''
- test:
'''typescript
test('test description', async ({page }) => {
    <!-- your code -->
});
- describe:
'''typescript
test.describe('Group description', () => {
    <!-- your code -->
});
- hook beforeEach:
'''typescript
test.beforeEach(async ({page }) => {
    <!-- your code -->
});
- running given test: 'test.only'

### Prettier

- install Prettier
'npm install --save-dev --save-exxact prettier'
- configure Prettier
    - exlude files in '.priettierignore'
    '''
    {
        "singleQuote": true,
        "endofLine": "auto"
    }
    '''
- run Prettier:
'npx prettier --write .'
- additionaly you can install VSC extension: **Prettier**
    - and set deflaut VSC formatter as Prettier (right mouse button and 'Format document with ...')