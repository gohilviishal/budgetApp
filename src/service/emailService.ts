import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "pinkesh2162@gmail.com",
    pass: "ygpp vfni vhye pzao",
  },
});

export const mailOptions = (to: string, otp: string) => ({
  from: "pinkesh2162@gmail.com",
  to,
  subject: "Your OTP Code",
  text: `Your OTP code is ${otp}`,
});
