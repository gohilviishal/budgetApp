import { Gender } from "app/models/user.model";
import * as yup from "yup";

export const authValidator = yup.object({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().required(),
});

export const loginValidator = yup.object({
  email: yup.string().trim().email().required(),
  password: yup.string().required(),
});

export const otpValidator = yup.object({
  email: yup.string().trim().email().required(),
});

export const otpVerifyValidator = yup.object({
  email: yup.string().trim().email().required(),
  otp: yup.string().trim().required(),
});

export const profileValidator = yup.object({
  gender: yup.string().trim().oneOf(Object.values(Gender)).required(),
  DOB: yup.date().required(),
  fullName: yup.string().trim().required(),
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10)
    .max(15)
    .required(),
});
