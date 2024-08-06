import { Type } from "app/models/categories.model";
import * as yup from "yup";

export const categoriesValidator = yup.object({
  name: yup.string().trim().required(),
  type:yup.string().oneOf(Object.values(Type)).required(),
  status: yup.boolean().required(),
  order: yup.number(),
});