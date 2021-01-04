export const authReducer = (state = { u: false }, action) => {
  switch (action.type) {
    case "IS_USER_SAVED":
      const data = window.localStorage.getItem("user");
      return (state = JSON.parse(data));
    case "LOGIN":
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      return (state = action.payload);

    case "LOGOUT":
      window.localStorage.removeItem("user");
      return (state = { u: false });

    default:
      return state;
  }
};
