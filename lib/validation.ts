import { z } from "zod";
import { isCountryAllowed } from "./countries";

export const registerSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(6, "Enter a valid phone number"),
  dateOfBirth: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date")
    .refine((v) => {
      const age = (Date.now() - Date.parse(v)) / (365.25 * 24 * 3600 * 1000);
      return age >= 18 && age < 120;
    }, "You must be at least 18"),
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  country: z.string().refine(isCountryAllowed, "We do not ship to this country"),
  postcode: z.string().min(2, "Required"),
  acceptTerms: z.literal(true, { message: "You must accept the terms" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotSchema = z.object({ email: z.string().email() });

export const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "At least 8 characters"),
});
