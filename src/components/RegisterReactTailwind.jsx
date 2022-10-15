import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../firebase.init";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const RegisterReactTailwind = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess(false);
    // const form = event.target;(emon likhle cole abar event.targt eki)
    // console.log(event.target.email.value);
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password, name);
    // validate password
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("please Two Uppercase");
      return;
    }
    if (password.length < 6) {
      setPasswordError("at least 6 Character");
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordError("Special Character add korte hobe");
      return;
    }

    setPasswordError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        event.target.reset();
        verifyEmail();
        updateUserName(name);
      })
      .catch((error) => {
        console.log("error", error);
        setPasswordError(error.message);
      });
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("verify your mail");
    });
  };
  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("display name update");
      })
      .catch((error) => {
        console.log("error", error);
        setPasswordError(error.message);
      });
  };
  return (
    <div className="w-6/12 mx-auto my-20">
      <h3 className="text-2xl">please Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300
     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
      dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your password"
            required
          />
        </div>
        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">successfully Created USER</p>}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
      <p class="text-center text-sm text-gray-500">
        Already you have an account?<Link to="/login"> Log in</Link>
      </p>
    </div>
  );
};

export default RegisterReactTailwind;
