import { test as pomtest } from '@playwright/test';
import { LoginPage } from './login.page';
import { NavigationPage } from '../components/navbar';
import { EditMyProfilePage } from './profile/editMyProfil.page';
import { MyProfilePage } from './profile/myProfile.page';
import { RegisterPage } from './register.page';
import { Utility } from './utility.page';
import { WelcomePage } from './welcome.page';
import { AddArticlesPage } from './articles/addArticleForm.page';
import { ArticleProfilePage } from './articles/articleProfile.page';
import { ArticlesPage } from './articles/articles.page';

type pages = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navigationPage: NavigationPage;
  welcomePage: WelcomePage;
  myProfilePage: MyProfilePage;
  editMyProfilePage: EditMyProfilePage;
  utility: Utility;
  articlesPage: ArticlesPage;
  addArticlesPage: AddArticlesPage;
  articleProfilePage: ArticleProfilePage;
};

const testPages = pomtest.extend<pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  myProfilePage: async ({ page }, use) => {
    await use(new MyProfilePage(page));
  },
  editMyProfilePage: async ({ page }, use) => {
    await use(new EditMyProfilePage(page));
  },
  utility: async ({ page }, use) => {
    await use(new Utility(page));
  },
  articlesPage: async ({ page }, use) => {
    await use(new ArticlesPage(page));
  },
  addArticlesPage: async ({ page }, use) => {
    await use(new AddArticlesPage(page));
  },
  articleProfilePage: async ({ page }, use) => {
    await use(new ArticleProfilePage(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
