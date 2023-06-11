export const signInReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return { ...state, [action.payload.name]: action.payload.value };

    default:
      return state;
  }
};
