import * as yup from "yup";

export const paymentsValidator = yup.object({
  name: yup.string().trim().required(),
  status: yup.boolean().required(),
  order: yup.number(),
});
