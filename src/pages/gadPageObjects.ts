import { test as pomtest } from '@playwright/test';
import { LoginPage } from '@_pages/login.page';
import { NavigationPage } from '@_components/navbar';
import { EditMyProfilePage } from '@_pages/profile/editMyProfil.page';
import { MyProfilePage } from '@_pages/profile/myProfile.page';
import { RegisterPage } from '@_pages/register.page';
import { Utility } from '@_pages/utility.page';
import { WelcomePage } from '@_pages/welcome.page';
import { AddArticlesPage } from '@_pages/articles/addArticleForm.page';
import { ArticleProfilePage } from '@_pages/articles/articleProfile.page';
import { ArticlesPage } from '@_pages/articles/articles.page';

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
