import z from "zod";

export const registerSchema = z
  .object({
    email: z.email(),
    first_name: z.string().min(5),
    last_name: z.string().min(5),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const registerPayloadSchema = registerSchema.omit({
  confirmPassword: true,
});

export const loginPayloadSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const updateProfileSchema = z.object({
  first_name: z.string().min(5),
  last_name: z.string().min(5),
});

export const topUpSchema = z.object({
  top_up_amount: z
    .number()
    .min(10000, "Minimal top up adalah 10.000")
    .max(1000000, "Maksimal top up adalah 1.000.000"),
});

export const transactionSchema = z.object({
  service_code: z.string().min(3),
});
