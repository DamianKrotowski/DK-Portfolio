import { Headers } from '@_api/models/headers.api.model';
import { primaryUserData } from '@_testdata/user.data';
import { APIRequestContext } from '@playwright/test';

export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginUrl = '/api/login';
  const userData = {
    email: primaryUserData.userEmail,
    password: primaryUserData.userPassword,
  };
  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });
  const responseLoginJson = await responseLogin.json();

  return {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
}
