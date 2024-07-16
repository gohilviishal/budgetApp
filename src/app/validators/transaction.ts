import * as yup from "yup";

export const trasactionValidator = yup.object({
  amount: yup.number().required(),
  category_id: yup.string().required(),
  payment_id: yup.string().required(),
  tag_id: yup.string().required(),
});

export const categoriesViseTransactionValidator = yup.object({
  start: yup.number().required(),
  end: yup.number().required(),
});

export const startTransactionValidator = yup.object({
  start: yup.number(),
  end: yup.number(),
});
