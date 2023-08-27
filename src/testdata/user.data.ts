import { Utility } from '../pages/utility.page';
import dotenv from 'dotenv';

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
  email: 'email72ca4950-ed3a-464c-89dc-0f7aed877690@gmail.com',
  password: 'Hasło1234!@#$',
  firstname: 'Jan',
  lastname: 'Kowalski',
  avatar: '9acce450-ca01-4050-bc4a-19e9b17b4cfa.jpg',
  id: 138,
};
