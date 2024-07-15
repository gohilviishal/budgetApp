import * as yup from "yup";

export const budgetValidator = yup.object({
  budget: yup.number().required(),
  category_id: yup.string().required(),
});

export const budgetUpdateValidator = yup.object({
  budget: yup.number().required(),
});
