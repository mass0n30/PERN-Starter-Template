
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import styles from '../styles/components/form.module.css';

// eslint-disable-next-line react-refresh/only-export-components

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  //JWT removed from local storage upon mount (redirect to login page)
  localStorage.removeItem('usertoken');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(async (response) => {

      const data = await response.json();
    
      if (data.error) {
        setError(data.error);
        return;
      }

      if (response.status == 401) {
        setError('Wrong email or password');
        return;
      }

      if (response.status > 401) {
        setError("server error");
        return;
      }
    // store token locally and navigate to home route where GET request fetch
      localStorage.setItem('usertoken', data.token);

      if (!data.error) {
        navigate("/home");
      }
    })
  };

    const handleGuestSubmit = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/home/guest`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(async (response) => {

      const data = await response.json();
    
      if (data.error) {
        setError(data.error);
        return;
      }

      if (!data.error) {
        navigate("/home");
      }
    })
  };


  return (
    <>
    {error ? (
      <p>A network error was encountered: {error}</p>
    ) : null}

      <div className={styles.formContainerOuter} >
        <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImage}>
          </div>
          <div className={styles.logoText}></div>
        </div>
        {error ? (
          <span style={{ color: 'red' }}>Error was encountered: {error}</span>
        ) : null}
        <form 
          onSubmit={handleSubmit} 
          method="POST" 
          className={styles.login_form} 
          autoComplete="off"
        >
          <div className={styles.form_row}>
            <input 
             className={styles.form_input}
             onChange={(e) => setUsername(e.target.value)}
             id="email" 
             name="username" 
             autoComplete="off" 
             placeholder="Enter Email" 
             type="text" 
            />
          </div>
          <div className={styles.form_row}>
            <input 
            className={styles.form_input}
            onChange={(e) => setPassword(e.target.value)} 
            id="password" 
            name="password"  
            autoComplete="new-password" 
            placeholder="Enter Password" 
            type ="password" 
            />
          </div>
          <div className={styles.form_row}>
            <button type="submit" className={styles.form_button}>Continue</button>
          </div>
        </form>
          <div className={styles.form_row_signup}>
            <div className={styles.form_link} >
             <> Not a member? </> 
            </div>
            <Link to="/sign-up">
              <button className={styles.form_button_signup}>Sign Up!</button>
            </Link>
          </div>
          <div className={styles.form_row_signup }>
            <button className={styles.guest_btn} onClick={handleGuestSubmit}>
              <div className={styles.guest_container}>
                  <div>Continue as Guest</div>
                  <CircleUserRound/>
              </div>
           </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;