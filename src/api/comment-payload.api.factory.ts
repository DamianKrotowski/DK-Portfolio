import { prepareRandomComment } from '@_src/ui/factories/comment.factory';
import { CommentPayload } from '../models/comment.api.model';

export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomComment();
  const commentData = {
    article_id: articleId,
    body: randomCommentData.body,
    date: new Date().toISOString(),
  };
  return commentData;
}
