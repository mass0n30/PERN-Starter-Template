
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
    await fetch('http://localhost:5000/', {
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

  return (
    <>
    {error ? (
      <p>A network error was encountered: {error}</p>
    ) : null}

      <div className={styles.formContainer}  >
        <form 
          onSubmit={handleSubmit} 
          method="POST" 
          id="loginFormInput" 
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
          <div className="formBtns">
            <button type="submit" className={styles.form_button}>Log In</button>
          </div>
        </form>
          <div className="formBtns" id="signUp">
            <div className={styles.form_link} >
              Not a member? 
            </div>
            <Link to="/sign-up">
              <button className={styles.form_button}>Sign Up!</button>
            </Link>
          </div>
      </div>
    </>
  )
}

export default Login;