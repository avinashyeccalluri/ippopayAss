import Text from "../input_helper/Text";
import { useReducer } from "react";
import { signUp } from "../../service/userManagement";
import {
  checkContinuousRepeats,
  addRemoveClasses,
  patternIdentifier,
  stepCounter
} from "../../helper/utility_methods";
import { signUpValidations } from "../../configurations/userManagement";
import { signInReducer } from "../../reducer/userManagement";

const SignUp = () => {
  let countCheck = false;
  let patternCheck = false;
  let repeastCharecterCheck = false;
  let defaultState = {
    userID: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPasswordRequirement: false,
    steps: 6
  };

  const [state, dispatch] = useReducer(signInReducer, defaultState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let signUpFlag = true;
    if (state.password !== state.confirmPassword) {
      signUpFlag = false;
      document.querySelector(
        `#signup_form input[name="confirmPassword"] + span.error`
      ).textContent = "Password and confirm password must match";
      document.querySelector(
        `#signup_form input[name="confirmPassword"] + span.error`
      ).style.display = "block";
    }
    if (signUpFlag && countCheck && patternCheck && repeastCharecterCheck) {
      signUp(state)
        .then((res) => console.log(res))
        .catch((e) => console.error(e));
    }
  };

  const inputChangeHandler = (e) => {
    document.querySelector(
      `#signup_form input[name="${e.target.name}"] + span.error`
    ).textContent = "";
    document.querySelector(
      `#signup_form input[name="${e.target.name}"] + span.error`
    ).style.display = "none";
    if (e.target.name === "password") {
      let value = e.target.value;
      value = value.trim();
      let stepsRequired = stepCounter(value);
      dispatch({
        type: "INPUT_CHANGE",
        payload: { name: "steps", value: stepsRequired }
      });
      if (
        value.length < signUpValidations.password.minlength ||
        value.length > signUpValidations.password.maxlength
      ) {
        countCheck = true;
        addRemoveClasses(
          document.querySelector("#signup_form .char_count_check"),
          false,
          true
        );
      } else {
        countCheck = false;
        addRemoveClasses(
          document.querySelector("#signup_form .char_count_check"),
          true,
          false
        );
      }
      if (value.length >= 3) {
        const patterIdentifier = patternIdentifier(value);
        if (patterIdentifier) {
          patternCheck = true;
          addRemoveClasses(
            document.querySelector("#signup_form .upper_lower_case_check"),
            true,
            false
          );
        } else {
          patternCheck = false;
          addRemoveClasses(
            document.querySelector("#signup_form .upper_lower_case_check"),
            false,
            true
          );
        }
        if (checkContinuousRepeats(value)) {
          repeastCharecterCheck = true;
          addRemoveClasses(
            document.querySelector("#signup_form .custom_validation_check"),
            false,
            true
          );
        } else {
          repeastCharecterCheck = false;
          addRemoveClasses(
            document.querySelector("#signup_form .custom_validation_check"),
            true,
            false
          );
        }
      } else {
        addRemoveClasses(
          document.querySelector("#signup_form .upper_lower_case_check"),
          false,
          true
        );
        addRemoveClasses(
          document.querySelector("#signup_form .custom_validation_check"),
          true,
          false
        );
      }

      if (value === "") {
        cleanUp();
      }
    }

    dispatch({
      type: "INPUT_CHANGE",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  const cleanUp = () => {
    document
      .querySelector("#signup_form .custom_validation_check")
      .classList.remove("error");
    document
      .querySelector("#signup_form .custom_validation_check")
      .classList.remove("text-green");
    document
      .querySelector("#signup_form .upper_lower_case_check")
      .classList.remove("error");
    document
      .querySelector("#signup_form .upper_lower_case_check")
      .classList.remove("text-green");
    document
      .querySelector("#signup_form .char_count_check")
      .classList.remove("error");
    document
      .querySelector("#signup_form .char_count_check")
      .classList.remove("text-green");
  };

  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-5 col-12 d-flex justify-content-center align-items-center sign-up-content">
          <div className="d-flex justify-content-center align-items-center flex-column text-light px-3">
            <div>
              <h1 className="">Hello, Friend!</h1>
            </div>
            <div className="text-center text-yellow">
              Enter your personal details and start your journey with us.
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-12 p-5 sign-up-input d-flex justify-content-center align-items-center">
          <form onSubmit={handleFormSubmit} id="signup_form">
            <div className="row">
              <div className="h1 col-12 d-flex justify-content-center align-items-center text-green">
                Create Account
              </div>
              <div className="col-lg-6 col-12 my-2">
                <Text
                  data={{
                    labelName: "User ID",
                    type: "text",
                    placeHolder: "User ID",
                    inputName: "userID",
                    onChangeHandler: inputChangeHandler
                  }}
                />
              </div>
              <div className="col-lg-6 col-12 my-2">
                <Text
                  data={{
                    labelName: "Email",
                    type: "email",
                    placeHolder: "Email",
                    inputName: "email",
                    onChangeHandler: inputChangeHandler
                  }}
                />
              </div>
              <div className="col-lg-6 col-12 my-2">
                <Text
                  data={{
                    labelName: "Password",
                    type: "password",
                    placeHolder: "Password",
                    inputName: "password",
                    onChangeHandler: inputChangeHandler
                  }}
                />
                <strong>
                  <div className="password_requirements  text-muted bg-white p-1 mt-2 ">
                    <div className="mt-2 text-green">
                      Your password need to:
                    </div>
                    <ul className="mt-2">
                      <li className="p-0 char_count_check validation_class">
                        contain atleast 6 to 20 charecters.
                      </li>
                      <li className="p-0 upper_lower_case_check validation_class">
                        include both upper case, lower case and a number.
                      </li>
                      <li className="p-0 custom_validation_check validation_class">
                        should not include same three consecutive letters.
                        <div>
                          eg. a<u>bbb</u>a
                        </div>
                      </li>
                    </ul>
                    {state.steps !== 0 && (
                      <div>Minimum steps required : {state.steps}</div>
                    )}
                  </div>
                </strong>
              </div>
              <div className="col-lg-6 col-12 my-2">
                <Text
                  data={{
                    labelName: "Confirm Password",
                    type: "password",
                    placeHolder: "Password",
                    inputName: "confirmPassword",
                    onChangeHandler: inputChangeHandler
                  }}
                />
              </div>
              <div className="col-12 mt-4">
                <div className="form-group d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
