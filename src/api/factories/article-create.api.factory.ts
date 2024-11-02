import { prepareArticlePayload } from '@_api/factories/article-payload.api.factory';
import { ArticlePayload } from '@_api/models/article.api.model';
import { Headers } from '@_api/models/headers.api.model';
import { expect } from '@_pages/gadPageObjects.fixture';
import { APIRequestContext, APIResponse } from '@playwright/test';

export async function createArticleWithApi(
  request: APIRequestContext,
  headers: Headers,
  articleData?: ArticlePayload,
): Promise<APIResponse> {
  const articleDataFinal = articleData || prepareArticlePayload();
  const responseArticle = await request.post('/api/articles', {
    headers,
    data: articleDataFinal,
  });
  const articleJson = await responseArticle.json();
  const expectedStatusCode = 200;

  await expect(async () => {
    const responseArticleCreated = await request.get(
      `${'/api/articles'}/${articleJson.id}`,
    );
    expect(
      responseArticleCreated.status(),
      `Expected status: ${expectedStatusCode} and observed: ${responseArticleCreated.status()}`,
    ).toBe(expectedStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseArticle;
}
