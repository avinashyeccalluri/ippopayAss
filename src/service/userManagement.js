import { validateData } from "../helper/utility_methods";
import { signUpValidations } from "../configurations/userManagement";
import User from "../model/userManagement";
export const signUp = (data = {}) => {
  return new Promise((resolve, reject) => {
    const signUpValidationRules = signUpValidations;
    let validationResponse = validateData(data, signUpValidationRules);
    if (!validationResponse.status) {
      let errors = validationResponse.error;
      for (const error in errors) {
        document.querySelector(
          `#signup_form input[name="${error}"] + span.error`
        ).textContent = errors[error];
        document.querySelector(
          `#signup_form input[name="${error}"] + span.error`
        ).style.display = "block";
      }
      // reject({ status: false, code: 412, data: { message: window.lang.responseMessages.validationError } });
    } else {
      const user = new User(data);
      user.save((err, user) => {
        if (err) {
          reject({
            status: false,
            responseBody: {
              code: 400,
              message: "NOT able to save user in DB"
            }
          });
        }
        resolve({
          status: false,
          responseBody: {
            code: 200,
            data: {
              name: user.name,
              email: user.email,
              id: user._id
            }
          }
        });
      });
    }
  });
};
