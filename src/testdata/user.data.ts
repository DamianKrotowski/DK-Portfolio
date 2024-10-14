import { faker } from '@faker-js/faker/locale/en';

export const newUserData = {
  email: faker.internet.email({}) ?? '[NOT SET]',
  password: faker.internet.password() ?? '[NOT SET]',
  firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
  lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
  birthDate: faker.date
    .between({ from: '1900-01-01', to: '2000-01-01' })
    .toISOString()
    .split('T')[0],
  avatar: '9acce450-ca01-4050-bc4a-19e9b17b4cfa.jpg',
};

export const regularUserData = {
  email: process.env.REGULAR_USER_EMAIL ?? '[NOT SET]',
  password: process.env.REGULAR_USER_PASSWORD ?? '[NOT SET]',
  firstName: 'Jan',
  lastName: 'Kowalski',
  birthDate: '1995-10-17',
  avatar: '9acce450-ca01-4050-bc4a-19e9b17b4cfa.jpg',
};

export const updatedUserData = {
  email: process.env.UPDATED_USER_EMAIL ?? '[NOT SET]',
  password: process.env.UPDATED_USER_PASSWORD ?? '[NOT SET]',
  firstName: 'Pawel',
  lastName: 'Nowak',
  birthDate: '1999-10-17',
  avatar: '9acce450-ca01-4050-bc4a-19e9b17b4cfa.jpg',
};

export const blankUserData = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  password: '',
};

export const wrongUserData = {
  firstName: 'WrongUserData',
  lastName: 'WrongUserData',
  email: 'WrongUserData',
  birthDate: 'WrongUserData',
  password: 'WrongUserData',
};

export const editUserData = {
  email: process.env.EDIT_USER_EMAIL ?? '[NOT SET]',
  password: process.env.EDIT_USER_PASSWORD ?? '[NOT SET]',
  firstName: 'Kamil',
  lastName: 'Nowak',
};

export const articleUserData = {
  email: process.env.ARTICLE_USER_EMAIL ?? '[NOT SET]',
  password: process.env.ARTICLE_USER_PASSWORD ?? '[NOT SET]',
  first_name: 'Jan',
  last_name: 'Kowalski',
  avatar: '9acce450-ca01-4050-bc4a-19e9b17b4cfa.jpg',
  id: 138,
};
