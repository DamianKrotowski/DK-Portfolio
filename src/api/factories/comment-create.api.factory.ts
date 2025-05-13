import { prepareCommentPayload } from '@_api/factories/comment-payload.api.factory';
import { CommentPayload } from '@_api/models/comment.api.model';
import { Headers } from '@_api/models/headers.api.model';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { expect } from 'src/ui/fixture/gadPageObjects.fixture';

export async function createCommentWithApi(
  request: APIRequestContext,
  headers: Headers,
  articleId: number,
  commentData?: CommentPayload,
): Promise<APIResponse> {
  const commentDataFinal = commentData || prepareCommentPayload(articleId);
  const responseComment = await request.post('/api/comments', {
    headers,
    data: commentDataFinal,
  });
  const commentJson = await responseComment.json();
  const expectedStatusCode = 200;

  await expect(async () => {
    const responseCommentCreated = await request.get(
      `/api/comments/${commentJson.id}`,
    );
    expect(
      responseCommentCreated.status(),
      `Expected status: ${expectedStatusCode} and observed: ${responseCommentCreated.status()}`,
    ).toBe(expectedStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseComment;
}
