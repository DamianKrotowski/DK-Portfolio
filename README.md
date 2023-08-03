# Introduction 
This is a Test Automation project based on 'Playwright' and 'TypeScript'.

## Commands

- check 'NodeJS' version:
'node -v'
- record tests for given site:
'npx playwright codegen https://groovy-chartreuse-ocelot.glitch.me'
- run tests without browser GUI:
'npx playwright test'
- run tests with browser GUI:
'npx playwright test --headed'
- Scripts
- run tests without browser GUI:
'npm run tests:gui'
- run api tests:
'npm run tests:api'

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
- enable video on fail
- enable Trace Viewer on fail

### Prettier

- install Prettier
'npm install --save-dev --save-exxact prettier'
- run Prettier:
'npx prettier --write .'
- additionaly you can install VSC extension: **Prettier**
    - and set deflaut VSC formatter as Prettier (right mouse button and 'Format document with ...')