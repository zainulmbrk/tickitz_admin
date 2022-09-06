// import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthLogin } from '../../../redux/actions/Auth'
import './Login.css'

const Login = () => {
  // const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userLogin'))??{})
  const { data, error, loading, isLogin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
    role: '',
  })

  // useEffect(() => {
  //   if (isLogin == true || role == process.env.ROLE_ADMIN) {
  //     navigation('/dashboard', { replace: true })
  //   } else {
  //     navigation('/', { replace: true })
  //   }
  // }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(AuthLogin(formLogin))
    if (isLogin === true && data.role === 'admin') {
      navigation('/dashboard', { replace: true })
    } else {
      navigation('/', { replace: true })
    }
  }

  return (
    <>
      <div className="container-main">
        <div className="card-login">
          <h2>Sign In</h2>
          <p>
            Sign in with your data that you entered during your registration
          </p>
          <form onSubmit={(event) => handleLogin(event)}>
            <div className="formInput">
              <div className="email">
                <input
                  type={'email'}
                  placeholder="Write your email"
                  required
                  onChange={(event) =>
                    setFormLogin((prevData) => ({
                      ...prevData,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="password">
                <input
                  type={'password'}
                  placeholder="Write your password"
                  required
                  onChange={(event) =>
                    setFormLogin((prevData) => ({
                      ...prevData,
                      password: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="submit">
              {/* <button className="button btn-signup" onClick={()=> handleLogin()}>Sign In</button> */}
              {loading ? (
                <button className="btn-signin" disabled={true}>
                  Loading..
                </button>
              ) : (
                <button className="btn-signin">Sign In</button>
              )}
              {error && <div>{error.message}</div>}
              <p>
                Forgot your password? <Link to="#">Reset now</Link>
              </p>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>.
              </p>
            </div>
            <div className="signin"></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
