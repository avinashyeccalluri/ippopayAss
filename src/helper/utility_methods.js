import { signUpValidations } from "../configurations/userManagement";
export const validateData = (data = {}, validationRules = {}) => {
  let result = { status: true, error: {} };
  for (const field in data) {
    if (validationRules[field]) {
      fieldsLoop: for (const validation in validationRules[field]) {
        switch (validation) {
          case "required":
            if (validationRules[field][validation] === true) {
              if (data[field].trim().length === 0) {
                let errorMesssage = `${validationLang[field]} is required`;
                result["status"] = false;
                result.error[field] = errorMesssage;
                break fieldsLoop;
              }
            }
            break;
          case "minLength":
            if (
              data[field].trim().length < validationRules[field][validation]
            ) {
              let errorMesssage = `The ${validationLang[field]} should contain atlest 6 charecters`;
              result["status"] = false;
              result.error[field] = errorMesssage;
              break fieldsLoop;
            }
            break;
          case "maxLength":
            if (
              data[field].trim().length > validationRules[field][validation]
            ) {
              let errorMesssage = `The ${validationLang[field]} should contain atlest 20 charecters`;
              result["status"] = false;
              result.error[field] = errorMesssage;
              break fieldsLoop;
            }
            break;
          case "regex":
            if (!validationRules[field][validation].test(data[field].trim())) {
              let errorMesssage = "Enter a valid email address";
              result["status"] = false;
              result.error[field] = errorMesssage;
            }
            break fieldsLoop;

          default:
            break;
        }
      }
    }
  }
  return result;
};

export const checkContinuousRepeats = (input) => {
  for (var i = 0; i < input.length - 2; i++) {
    var char1 = input[i];
    var char2 = input[i + 1];
    var char3 = input[i + 2];

    if (char1 === char2 && char2 === char3) {
      return true; // Found three continuous repeated characters
    }
  }

  return false; // No three continuous repeated characters found
};

export const addRemoveClasses = (element, success = false, error = false) => {
  if (success) {
    element.classList.add("text-green");
    element.classList.remove("error");
  }
  if (error) {
    element.classList.remove("text-green");
    element.classList.add("error");
  }
};

const validationLang = {
  userID: "User ID",
  email: "Email adddress",
  password: "Password",
  confirmPassword: "Confrim Password"
};

export const patternIdentifier = (value) => {
  var uppercaseRegex = /[A-Z]/;
  var lowercaseRegex = /[a-z]/;
  var numberRegex = /[0-9]/;
  var containsUppercase = uppercaseRegex.test(value);
  var containsLowercase = lowercaseRegex.test(value);
  var containsNumber = numberRegex.test(value);
  return containsUppercase && containsLowercase && containsNumber;
};

export const stepCounter = (password) => {
  const minlength = signUpValidations.password.minlength;
  const maxlength = signUpValidations.password.maxlength;
  var steps = 0;
  let validFlag = true;

  var uppercaseRegex = /[A-Z]/;
  var lowercaseRegex = /[a-z]/;
  var numberRegex = /[0-9]/;
  var containsUppercase = uppercaseRegex.test(password);
  var containsLowercase = lowercaseRegex.test(password);
  var containsNumber = numberRegex.test(password);
  var checkContinuousRepeat = checkContinuousRepeats(password);
  if (password.length < minlength) {
    steps += minlength - password.length;
    validFlag = false;
  }
  if (password.length > maxlength) {
    steps += password.length - password.length;
    validFlag = false;
  }
  if (validFlag) {
    if (!containsUppercase) steps += 1;
    if (!containsNumber) steps += 1;
    if (!containsLowercase) steps += 1;
    if (!checkContinuousRepeat) steps += 1;
    console.log(password);
    if (password.length >= minlength) {
      steps = 0;
      if (
        containsNumber &&
        !containsLowercase &&
        !containsUppercase &&
        !checkContinuousRepeat
      ) {
        console.log("1->");
        steps += 2;
      } else if (
        containsNumber &&
        containsLowercase &&
        !containsUppercase &&
        !checkContinuousRepeat
      ) {
        console.log("2->");
        steps += 1;
      } else if (
        containsNumber &&
        containsLowercase &&
        containsUppercase &&
        !checkContinuousRepeat
      ) {
        console.log("3->");
        steps += 0;
      } else if (
        checkContinuousRepeat &&
        !containsLowercase &&
        !containsUppercase &&
        !containsNumber
      ) {
        console.log("4->");
        steps += 2;
      } else if (
        checkContinuousRepeat &&
        containsLowercase &&
        containsUppercase &&
        containsNumber
      ) {
        console.log("main->");
        steps += 1;
      } else if (
        checkContinuousRepeat &&
        containsLowercase &&
        !containsUppercase &&
        !containsNumber
      ) {
        console.log("5->");
        steps += 3;
      } else if (
        checkContinuousRepeat &&
        containsLowercase &&
        containsUppercase &&
        !containsNumber
      ) {
        console.log("6->");
        steps += 2;
      } else if (
        containsLowercase &&
        !containsUppercase &&
        !containsNumber &&
        !checkContinuousRepeat
      ) {
        console.log("7->");
        steps += 2;
      } else if (
        containsLowercase &&
        containsUppercase &&
        !containsNumber &&
        !checkContinuousRepeat
      ) {
        console.log("8->");
        steps += 1;
      } else if (
        containsLowercase &&
        containsUppercase &&
        containsNumber &&
        !checkContinuousRepeat
      ) {
        console.log("9->");
        steps += 0;
      } else if (
        containsUppercase &&
        !containsNumber &&
        !checkContinuousRepeat &&
        !containsLowercase
      ) {
        console.log("10->");
        steps += 2;
      } else if (
        containsUppercase &&
        containsNumber &&
        !checkContinuousRepeat &&
        !containsLowercase
      ) {
        console.log("11->");
        steps += 1;
      } else if (
        containsUppercase &&
        containsNumber &&
        checkContinuousRepeat &&
        !containsLowercase
      ) {
        console.log("12->");
        steps += 2;
      } else if (
        containsNumber &&
        !checkContinuousRepeat &&
        !containsLowercase &&
        !containsUppercase
      ) {
        console.log("13->");
        steps += 2;
      } else if (
        containsNumber &&
        checkContinuousRepeat &&
        !containsLowercase &&
        !containsUppercase
      ) {
        console.log("14->");
        steps += 3;
      } else if (
        containsNumber &&
        checkContinuousRepeat &&
        containsLowercase &&
        !containsUppercase
      ) {
        console.log("15->");
        steps += 2;
      }
      if (
        containsNumber &&
        !checkContinuousRepeat &&
        containsLowercase &&
        !containsUppercase
      ) {
        console.log("16->");
        steps += 2;
      }

      // if()

      // if (upperCaseLowerCaseNoNumber.test(password)) {
      //   console.log("1->");
      //   steps += 1;
      // } else if (upperCaseNumberNoLowerCase.test(password)) {
      //   console.log("2->");
      //   steps += 1;
      // } else if (LowerCaseNumberNoUpperCase.test(password)) {
      //   console.log("3->");
      //   steps += 1;
      // }
    }
  }
  console.log("steps-> ", steps);
  return steps;
};
