import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app'

function LoginPage() {
  let firebaseConfig = {
    apiKey: "AIzaSyBZooInpw9dvQ_qg-seazvM-2K3bAfUAV8",
    authDomain: "react-redux-firebase-cha-1a50f.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-cha-1a50f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-redux-firebase-cha-1a50f",
    storageBucket: "react-redux-firebase-cha-1a50f.appspot.com",
    messagingSenderId: "967222648992",
    appId: "1:967222648992:web:affe50e93964914ba7e9c5",
    measurementId: "G-GZYPVZLGSX"
  };
  let app = initializeApp(firebaseConfig);
  let auth = getAuth(app);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [ errorFromSubmit, setErrorFromSubmit ] = useState("")
  const [ loading, setLoading ] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      await signInWithEmailAndPassword(auth, data.email, data.password);

      setLoading(false)
    } catch (error) {
      setErrorFromSubmit(error.message)
      setLoading(false)
      setTimeout(() => {
        setErrorFromSubmit("")
      }, 5000);
    }
  }

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}

        {errorFromSubmit &&
          <p>{errorFromSubmit}</p>
        }

        <input type="submit" disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="/register">아직 아이디가 없다면...  </Link>
      </form>

    </div>
  )
}

export default LoginPage
