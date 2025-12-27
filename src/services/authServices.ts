import { apiInstance } from "@/utils/axios";
import { loginPayloadSchema, registerPayloadSchema } from "@/schema/authSchema";
import z from "zod";

type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export const postRegister = async (data: RegisterPayload) =>
  apiInstance.post("/registration", data).then((res) => res.data);

type LoginInput = z.infer<typeof loginPayloadSchema>;
export const postLogin = async (data: LoginInput) =>
  apiInstance.post("/login", data).then((res) => res.data);
