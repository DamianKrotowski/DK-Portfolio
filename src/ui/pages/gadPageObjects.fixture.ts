import { NavigationPage } from '@_components/navbar';
import { AddArticlesView } from '@_pages/articles/addArticle.view';
import { AddCommentView } from '@_pages/articles/addComment.view';
import { ArticleProfilePage } from '@_pages/articles/articleProfile.page';
import { ArticlesPage } from '@_pages/articles/articles.page';
import { CommentPage } from '@_pages/articles/comment.page';
import { EditCommentView } from '@_pages/articles/editComment.view';
import { LoginPage } from '@_pages/login.page';
import { EditMyProfilePage } from '@_pages/profile/editMyProfil.page';
import { MyProfilePage } from '@_pages/profile/myProfile.page';
import { RegisterPage } from '@_pages/register.page';
import { Utility } from '@_pages/utility.page';
import { WelcomePage } from '@_pages/welcome.page';
import { test as pomtest } from '@playwright/test';
type pages = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navigationPage: NavigationPage;
  welcomePage: WelcomePage;
  myProfilePage: MyProfilePage;
  editMyProfilePage: EditMyProfilePage;
  utility: Utility;
  articlesPage: ArticlesPage;
  addArticlesView: AddArticlesView;
  addCommentView: AddCommentView;
  articleProfilePage: ArticleProfilePage;
  commentPage: CommentPage;
  editCommentView: EditCommentView;
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
  addArticlesView: async ({ page }, use) => {
    await use(new AddArticlesView(page));
  },
  articleProfilePage: async ({ page }, use) => {
    await use(new ArticleProfilePage(page));
  },
  addCommentView: async ({ page }, use) => {
    await use(new AddCommentView(page));
  },
  commentPage: async ({ page }, use) => {
    await use(new CommentPage(page));
  },
  editCommentView: async ({ page }, use) => {
    await use(new EditCommentView(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
