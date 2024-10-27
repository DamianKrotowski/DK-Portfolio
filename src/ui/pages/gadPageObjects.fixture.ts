import { test as pomtest } from '@playwright/test';
import { NavigationPage } from 'src/ui/components/navbar';
import { AddArticlesView } from 'src/ui/pages/articles/addArticle.view';
import { AddCommentView } from 'src/ui/pages/articles/addComment.view';
import { ArticleProfilePage } from 'src/ui/pages/articles/articleProfile.page';
import { ArticlesPage } from 'src/ui/pages/articles/articles.page';
import { CommentPage } from 'src/ui/pages/articles/comment.page';
import { EditCommentView } from 'src/ui/pages/articles/editComment.view';
import { LoginPage } from 'src/ui/pages/login.page';
import { EditMyProfilePage } from 'src/ui/pages/profile/editMyProfil.page';
import { MyProfilePage } from 'src/ui/pages/profile/myProfile.page';
import { RegisterPage } from 'src/ui/pages/register.page';
import { Utility } from 'src/ui/pages/utility.page';
import { WelcomePage } from 'src/ui/pages/welcome.page';
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
