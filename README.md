# Introduction

This is a Test Automation project based on 'Playwright' and 'TypeScript'.
Remember to wake up app.

- go to `https://groovy-chartreuse-ocelot.glitch.me` and wake up app.

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install`
- prepare local env file: `cp .env-template .env`

## Commands

- check 'NodeJS' version: `node -v`
- record tests for given site:
  `npx playwright codegen https://groovy-chartreuse-ocelot.glitch.me`

### Scripts

- run tests without browser GUI:
  `npm run tests:gui`
- run api tests:
  `npm run tests:api`
- run ui mode:
  `npx playwright test --ui`

## Updating Playwright

- check if Playwright should be updated:
  `npm outdated @playwright/test`
- update Playwright:
  `npm i @playwright/test`
- update browsers:
  `npx playwright install`
- verify Playwright version:
  `npx @playwright/test --version`

## Playwright Config Modifications

- config file `playwright.config.ts`
- disable browser, i.e. Firefox
- enable video on fail
- enable Trace Viewer on fail

## Prettier

- install Prettier

  `npm install --save-dev --save-exxact prettier`

- run Prettier:
  `npx prettier --write .`
- additionaly you can install VSC extension: **Prettier**
  - and set deflaut VSC formatter as Prettier (right mouse button and 'Format document with ...')

## ESLint

- install ESLint:

  `npm install eslint@8 --save-dev`

  `npm install @typescript-eslint/eslint-plugin --save-dev`

  `npm install @typescript-eslint/parser --save-dev`

- install package ESLint Playwright:
  `npm install eslint-plugin-playwright --save-dev`

Install ESLint + Prettier

- resolving conflicts between Prettier and ESLint:
  `npm install eslint-config-prettier --save-dev`

- running Prettier as a Policy for ESLint:
  `npm install eslint-plugin-prettier@latest --save-dev`

## Dotenv

- install Dotenv:
  `npm i -D dotenv`
