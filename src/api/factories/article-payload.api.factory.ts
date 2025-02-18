import { ArticlePayload } from '@_api/models/article.api.model';
import { prepareRandomNewArticle } from '@_factories/article.factory';

export function prepareArticlePayload(): ArticlePayload {
  const randomArticleData = prepareRandomNewArticle();
  const articleData = {
    title: randomArticleData.title,
    body: randomArticleData.body,
    date: new Date().toISOString(),
    image:
      '.\\data\\images\\256\\tester-app_9f26eff6-2390-4460-8829-81a9cbe21751.jpg',
  };
  return articleData;
}
