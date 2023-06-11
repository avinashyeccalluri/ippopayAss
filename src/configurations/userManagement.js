export const signUpValidations = {
  userID: {
    required: true,
    maxLength: 20,
    minLength: 6
  },
  email: {
    required: true,
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    required: true,
    minlength: 6,
    maxlength: 20,
    uppercase: true,
    lowercase: true
  },
  confirmPassword: {
    required: true,
    minlength: 6,
    maxlength: 20,
    uppercase: true,
    lowercase: true
  }
};
