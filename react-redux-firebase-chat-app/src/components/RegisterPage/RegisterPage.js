import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import md5 from 'md5';
import { initializeApp } from 'firebase/app'

function RegisterPage() {
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
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const [ errorFromSubmit, setErrorFromSubmit ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const password = useRef();
  password.current = watch("password");

  const onSubmit = async(data) => {

    try {
      setLoading(true)
      let app = initializeApp(firebaseConfig);
      let auth = getAuth(app);
      let createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
      console.log('createdUser : ', createdUser)

      // Add to displayName, photoURL
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      })

      // Save in Firebase realtime database (users table[ref])
      await set(ref(getDatabase(), `users/${createdUser.user.uid}`), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL
      })

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
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
        {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) =>
              value === password.current
          })}
        />
        {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
        {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}

        {errorFromSubmit &&
          <p>{errorFromSubmit}</p>
        }

        <input type="submit" disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">이미 아이디가 있다면...  </Link>
      </form>
    </div>
  )
}

export default RegisterPage
