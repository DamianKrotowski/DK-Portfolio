# Introduction

This is a Test Automation project based on 'Playwright' and 'TypeScript'.
Remember to wake up app.

- Go to `https://groovy-chartreuse-ocelot.glitch.me` and wake up app.

### Installation and setup

- (Optional) install VSC recommended plugins
- Install dependencies: `npm install`
- Setup Playwright with: `npx playwright install`
- Prepare local env file: `cp .env-template .env`

## Commands

- Check 'NodeJS' version: `node -v`
- Record tests for given site:
  `npx playwright codegen https://groovy-chartreuse-ocelot.glitch.me`

### Scripts

- Run tests without browser GUI:
  `npm run tests:gui`
- Run API tests:
  `npm run tests:api`
- Run UI mode:
  `npx playwright test --ui`

## Updating Playwright

- Check if Playwright should be updated:
  `npm outdated @playwright/test`
- Update Playwright:
  `npm i @playwright/test`
- Update browsers:
  `npx playwright install`
- Verify Playwright version:
  `npx @playwright/test --version`

## Playwright Config Modifications

- Config file `playwright.config.ts`
- Disable browser, i.e. Firefox
- Enable video on fail
- Enable Trace Viewer on fail

## Prettier

- Install Prettier

  `npm install --save-dev --save-exxact prettier`

- Run Prettier:
  `npx prettier --write .`
- Additionally you can install VSC extension: **Prettier**

  - And set deflaut VSC formatter as Prettier (right mouse button and 'Format document with ...')

- Install sort imports : `npm install --save-dev @trivago/prettier-plugin-sort-imports`

## ESLint

- Install ESLint:

  `npm init @eslint/config@latest`

  `npm install @typescript-eslint/eslint-plugin --save-dev`

  `npm install @typescript-eslint/parser --save-dev`

- Install package ESLint Playwright:
  `npm install eslint-plugin-playwright --save-dev`

### Install ESLint + Prettier

- Resolving conflicts between Prettier and ESLint:
  `npm install eslint-config-prettier --save-dev`

- Running Prettier as a Policy for ESLint:
  `npm install eslint-plugin-prettier@latest --save-dev`

### Husky

- Install Husky:
  `npm install husky --save-dev`
  `npx husky`

## Dotenv

- Install Dotenv:
  `npm i -D dotenv`
