export const emailValidation = {
  required: true,
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Email Is Invalid",
  },
};

export const passwordValidation = {
  required: true,
  pattern: {
    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
    message:
      "Password must contain at least one digit, lowercase letter, uppercase letter, special character",
  },
  minLength: {
    value: 6,
    message: "Minimum length should be 6 characters",
  },
  maxLength: {
    value: 16,
    message: "Maximum length exceeded 16",
  },
};
