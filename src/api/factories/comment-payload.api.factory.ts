import { prepareRandomNewComment } from '@_factories/comment.factory';
import { CommentPayload } from '../models/comment.api.model';

export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomNewComment();
  const commentData = {
    article_id: articleId,
    body: randomCommentData.body,
    date: new Date().toISOString(),
  };
  return commentData;
}
