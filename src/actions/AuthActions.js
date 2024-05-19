import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data || "Login failed. Please try again.";
    dispatch({ type: "AUTH_FAIL", payload: errorMessage });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "Signup failed. Please try again.";
    dispatch({ type: "AUTH_FAIL", payload: errorMessage });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
