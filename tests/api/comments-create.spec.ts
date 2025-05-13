import { createArticleWithApi } from '@_api/factories/article-create.api.factory';
import { getAuthorizationHeader } from '@_api/factories/authorization-header.api.factory';
import { createCommentWithApi } from '@_api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_api/factories/comment-payload.api.factory';
import { Headers } from '@_api/models/headers.api.model';
import { expect, test } from 'src/ui/fixture/gadPageObjects.fixture';

test.describe('Verify comments create operations', () => {
  let articleId: number;
  let headers: Headers;

  test.beforeAll('create an article', async ({ request }) => {
    headers = await getAuthorizationHeader(request);
    const responseArticle = await createArticleWithApi(request, headers);

    const article = await responseArticle.json();
    articleId = article.id;
  });

  test('should not create an comment without a logged-in user', async ({
    request,
  }) => {
    const expectedStatusCode = 401;
    const commentData = prepareCommentPayload(articleId);
    const response = await request.post('/api/comments', {
      data: commentData,
    });

    expect(response.status()).toBe(expectedStatusCode);
  });

  test('should create a comment with logged-in user', async ({ request }) => {
    const expectedStatusCode = 201;
    const commentData = prepareCommentPayload(articleId);
    const responseComment = await createCommentWithApi(
      request,
      headers,
      articleId,
      commentData,
    );

    const actualResponseStatus = responseComment.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const comment = await responseComment.json();
    expect.soft(comment.body).toEqual(commentData.body);
  });
});
