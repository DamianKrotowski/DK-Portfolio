import { test, expect } from '@playwright/test';
import { articleUserData } from '@_testdata/user.data';
import { newArticleData, updatedArticleData } from '@_testdata/articles.data';

test.describe('API Testing - CRUD Articles', () => {
  const baseUrl = 'https://groovy-chartreuse-ocelot.glitch.me/api';
  let articleId: string;
  let token: string;

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: articleUserData.email,
        password: articleUserData.password,
      },
    });
    const responseBody = JSON.parse(await response.text());
    token = responseBody.access_token;
    expect(response.status()).toBe(200);
    expect(responseBody.access_token).toBe(token);
  });

  test('POST Request - Add Article', async ({ request }) => {
    const response = await request.post(`${baseUrl}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: 138,
        title: newArticleData.title,
        body: newArticleData.body,
        date: newArticleData.date,
        image: newArticleData.image,
      },
    });
    const responseBody = JSON.parse(await response.text());
    articleId = responseBody.id;
    expect(response.status()).toBe(201);
  });

  test('GET Request - Reading article data', async ({ request }) => {
    const response = await request.get(`${baseUrl}/articles/${articleId}`);
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.title).toBe(newArticleData.title);
    expect(responseBody.body).toBe(newArticleData.body);
    expect(responseBody.date).toBe(newArticleData.date);
    expect(responseBody.image).toBe(newArticleData.image);
  });

  test('PUT Request - Update article data', async ({ request }) => {
    const response = await request.put(`${baseUrl}/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: 138,
        title: updatedArticleData.title,
        body: updatedArticleData.body,
        date: updatedArticleData.date,
        image: updatedArticleData.image,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.title).toBe(updatedArticleData.title);
    expect(responseBody.body).toBe(updatedArticleData.body);
    expect(responseBody.date).toBe(updatedArticleData.date);
    expect(responseBody.image).toBe(updatedArticleData.image);
    expect(response.status()).toBe(200);
  });

  test('DELETE Request - Delete article', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
  });

  test('GET Request - Deleted article is not found', async ({ request }) => {
    const response = await request.get(`${baseUrl}/articles/${articleId}`);
    expect(response.status()).toBe(404);
  });
});
