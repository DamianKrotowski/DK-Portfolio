import { faker } from '@faker-js/faker/locale/en';
import { RegisterUser } from 'src/models/user.model';

export function randomUser(): RegisterUser {
  const registerUserData: RegisterUser = {
    userEmail: faker.internet.email({}) ?? '[NOT SET]',
    userPassword: faker.internet.password() ?? '[NOT SET]',
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userBirthDate: faker.date
      .between({ from: '1900-01-01', to: '2000-01-01' })
      .toISOString()
      .split('T')[0],
  };
  return registerUserData;
}
