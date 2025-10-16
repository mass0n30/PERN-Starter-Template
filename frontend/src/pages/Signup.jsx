
{/* import { useState, useEffect } from 'react' */}
{/*maybe import local styles */}
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/components/form.module.css';

function SignUp() {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    alias: '',
    email: '',
    password: '',
    passwordconfirm: ''
  });
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  //validate and sanitize for user exp frontend, deep validation backend
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/sign-up", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: user.fname,
        lastname: user.lname,
        alias: user.alias,
        username: user.email,
        password: user.password,
        passwordconfirm: user.passwordconfirm,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.errors || ["Something went wrong"]);
      return;
    }

    if (response.ok || response.status === 201) {
      navigate("/")
    }
  } catch (err) {
    console.error(err);
    setError(["Network or server error"]);
  }
};


  //handler function for user info
  const updateInfo = (value, propType) => {

    const changeUser = {...user, [propType]:value};

    setUser(changeUser);
  };


  return (
    <>
    {error ? (
      <ul>
        {error.map((err, index) => (
          <li key={index}>{err.msg}</li>
        ))}
      </ul>
    ) : null}
        
        
    <div  className={styles.formContainer}>
      <form 
        onSubmit={handleSubmit} 
        method="POST" 
        id="signupForm" 
        autoComplete="off"
      >
        <div className={styles.form_row}>
          <input
            id="firstname"
            className={styles.form_input}
            name="firstname"
            autoComplete="off"
            placeholder="First Name"
            type="text"
            onChange={(event) => updateInfo(event.target.value, "fname")}
          />
        </div>

        <div className={styles.form_row}>
          <input
            id="lastname"
            className={styles.form_input}
            name="lastname"
            autoComplete="off"
            placeholder="Last Name"
            type="text"
            onChange={(event) => updateInfo(event.target.value, "lname")}
          />
        </div>

        <div className={styles.form_row}>
          <input
            id="email"
            className={styles.form_input}
            name="username"
            autoComplete="off"
            placeholder="Email"
            type="email"
            onChange={(event) => updateInfo(event.target.value, "email")}
          />
        </div>

        <div className={styles.form_row}>
          <input
            id="alias"
            className={styles.form_input}
            name="alias"
            autoComplete="off"
            placeholder="Username"
            type="text"
            onChange={(event) => updateInfo(event.target.value, "alias")}
          />
        </div>

        <div className={styles.form_row}>
          <input
            id="password"
            className={styles.form_input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => updateInfo(event.target.value, "password")}
          />
        </div>

        <div className={styles.form_input}>
          <input
            id="passwordconfirm"
            className={styles.form_input}
            name="passwordconfirm"
            type="password"
            placeholder="Repeat Password"
            onChange={(event) => updateInfo(event.target.value, "passwordconfirm")}
          />
        </div>

        <div className="formBtns">
          <button type="submit" className={styles.form_button}>Sign Up</button>
          <Link to="/">
            <button type="button"  className={styles.form_button}>Login</button>
          </Link>
        </div>
      </form>
    </div>
    </>
  )
}

export default SignUp;