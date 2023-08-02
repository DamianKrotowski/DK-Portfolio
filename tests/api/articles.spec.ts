// import { test, expect } from "@playwright/test";
// import { v4 as uuidv4 } from "uuid";
// import { Utility } from "../../pages/utility.page";
// import { regularUserData } from "../../testdata/user.data";

// test.describe("API Testing - CRUD User", () => {
//   const baseUrl = "https://groovy-chartreuse-ocelot.glitch.me/api";
//   const uniqueId = uuidv4(); // Generate a random UUID
//   const email = `email${uniqueId}@gmail.com`;
//   let userId: string;
//   let token: string;

//   test("POST Request - Login ", async ({ request }) => {
//     const response = await request.post(`${baseUrl}/login`, {
//       data: {
//         email: email,
//         password: "Hasło1234!@#$",
//       },
//     });
//     const responseBody = JSON.parse(await response.text());
//     token = responseBody.access_token; // Store the created user's ID
//     expect(response.status()).toBe(200);
//     expect(responseBody.access_token).toBeTruthy();
//   });

// });
