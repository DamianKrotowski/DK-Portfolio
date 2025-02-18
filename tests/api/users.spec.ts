import { regularUserData, updatedUserData } from '@_testdata/user.data';
import { expect, test } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('API Testing - User CRUD', () => {
  const baseUrl = 'https://groovy-chartreuse-ocelot.glitch.me/api';
  const uniqueId = uuidv4();
  const email = `email${uniqueId}@gmail.com`;
  let userId: string;
  let token: string;

  test('POST Request - Create user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        email: email,
        first_name: regularUserData.firstName,
        last_name: regularUserData.lastName,
        password: regularUserData.password,
        avatar: regularUserData.avatar,
      },
    });
    const responseBody = JSON.parse(await response.text());
    userId = responseBody.id;
    expect(response.status()).toBe(201);
  });

  test('GET Request - Reading user data', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.email).toBeTruthy();
    expect(responseBody.first_name).toBe(regularUserData.firstName);
    expect(responseBody.last_name).toBeTruthy();
    expect(responseBody.password).toBeTruthy();
    expect(responseBody.avatar).toBe(regularUserData.avatar);
  });

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: email,
        password: regularUserData.password,
      },
    });
    const responseBody = JSON.parse(await response.text());
    token = responseBody.access_token;
    expect(response.status()).toBe(200);
    expect(responseBody.access_token).toBeTruthy();
  });

  test('PUT Request - Update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: email,
        first_name: updatedUserData.firstName,
        last_name: updatedUserData.lastName,
        password: updatedUserData.password,
        avatar: updatedUserData.avatar,
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.email).toBe(email);
    expect(responseBody.first_name).toBe(updatedUserData.firstName);
    expect(responseBody.last_name).toBe(updatedUserData.lastName);
    expect(responseBody.password).toBe(updatedUserData.password);
    expect(responseBody.avatar).toBe(updatedUserData.avatar);
    expect(response.status()).toBe(200);
  });

  test('DELETE Request - Delete User', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
  });

  test('GET Request - Deleted user is not found', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/${userId}`);
    expect(response.status()).toBe(404);
  });
});
