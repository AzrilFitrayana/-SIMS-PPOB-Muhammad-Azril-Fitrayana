import type {
  topUpSchema,
  transactionSchema,
  updateProfileSchema,
} from "@/schema/authSchema";
import { apiInstance, apiInstanceWithToken } from "@/utils/axios";
import type z from "zod";

//tidak membutuhkan token
export const getBanner = () =>
  apiInstance.get("/banner").then((res) => res.data);

// membutuhkan token
export const getUserProfile = () =>
  apiInstanceWithToken.get("/profile").then((res) => res.data);

type UserInputUpdate = z.infer<typeof updateProfileSchema>;
export const putUserProfile = (data: UserInputUpdate) =>
  apiInstanceWithToken.put("/profile/update", data).then((res) => res.data);

export const putUserGambar = (data: FormData) =>
  apiInstanceWithToken
    .put("/profile/image", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const getBalance = () =>
  apiInstanceWithToken.get("/balance").then((res) => res.data);

export const getServices = () =>
  apiInstanceWithToken.get("/services").then((res) => res.data);

type topUpInput = z.infer<typeof topUpSchema>;
export const postTopUp = (data: topUpInput) =>
  apiInstanceWithToken.post("/topup", data).then((res) => res.data);

type transactionInput = z.infer<typeof transactionSchema>;
export const postTransaction = (data: transactionInput) =>
  apiInstanceWithToken.post("/transaction", data).then((res) => res.data);

export const getHistoryTransaction = ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) =>
  apiInstanceWithToken
    .get("/transaction/history", { params: { offset, limit } })
    .then((res) => res.data);
