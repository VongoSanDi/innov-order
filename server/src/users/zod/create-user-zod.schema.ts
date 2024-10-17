import { z } from 'zod';

const loginValidation = z
  .string()
  .min(1, 'login required')
  .max(10, '10 char max');

const passwordValidation = z
  .string()
  .min(1, 'password required')
  .max(10, 'The password must contain 10 characters minimum');

export const CreateUserSchema = z.object({
  login: loginValidation,
  password: passwordValidation,
});

export const LoginParamSchema = z.object({
  login: loginValidation,
});

export const UpdateUserSchema = z.object({
  login: loginValidation,
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
});
