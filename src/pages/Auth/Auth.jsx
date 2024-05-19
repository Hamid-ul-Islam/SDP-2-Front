import React, { useState } from "react";
// import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateStudentId } from "../../utils/studenIdValidator.js";
import { getBatchNumberFromStudentId } from "../../utils/getBatch.js";

const Auth = () => {
  const initialState = {
    fullName: "",
    email: "",
    studentId: "",
    password: "",
  };
  const { loading, error } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [isValidId, setIsValidId] = useState(true);
  // const dispatch = useDispatch()

  console.log(error);
  // Reset Form
  const resetForm = () => {
    setData(initialState);
  };

  // handle Change in input
  const handleChange = (e) => {
    if (e.target.name === "studentId") {
      if (!validateStudentId(e.target.value)) {
        setIsValidId(false);
      } else {
        setIsValidId(true);
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(data, navigate));
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="h-svh items-center justify-center sm:flex">
      {/* left side */}

      <div className="">
        <img className="" src={Logo} alt="logo" />
      </div>

      {/* right form side */}

      <div className="w-[400px]">
        <form
          className="bg-slate-100 border rounded p-6 flex flex-col items-center justify-center gap-5"
          onSubmit={handleSubmit}
        >
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <input
              className="p-3 rounded w-full"
              required
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
            />
          )}

          <input
            className="p-3 rounded w-full"
            required
            type="text"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />

          {isSignUp && (
            <input
              className="p-3 rounded w-full"
              required
              type="text"
              name="studentId"
              placeholder="Student Id"
              onChange={handleChange}
            />
          )}

          {isSignUp && !isValidId && (
            <p className="bg-red-100 rounded p-2 text-center text-red-500">
              Invalid Student Id
              <br /> Only valid CSE Student Id is supported
            </p>
          )}
          <input
            className="p-3 rounded w-full"
            required
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />

          <div className="flex flex-col w-full justify-center gap-2">
            <span className="text-red-500 text-center">{ error ? error : "" }</span>
            <span
              className={`self-center text-sm underline cursor-pointer`}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full font-medium disabled:bg-indigo-300 disabled:cursor-not-allowed"
              type="Submit"
              disabled={loading || (isSignUp && !isValidId)}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
