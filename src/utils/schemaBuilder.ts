import { z } from 'zod';

export const schemaBuilder = {
  email: z.string().min(1, 'This field is required').email().max(255),
  password: z.string().min(1, 'This field is required').min(8).max(255),
  confirmPassword: z.string().min(1, 'This field is required'),
  name: z
    .string()
    .min(1, 'This field is required')
    .min(2, 'Name must be atleast 3 characters')
    .max(255),
  content: z.string().min(1).max(500),
};
