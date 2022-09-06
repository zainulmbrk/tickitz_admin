import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AuthRegister } from "../../../redux/actions/Register";
import "./Register.css";  

const Register = ({props}) =>{
    // const [userSignup, setUserSignup] = useState(JSON.parse(localStorage.getItem('userSignup'))??{})
    const {data, error, loading, isRegister} = useSelector((state)=>state.register)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [formRegister, setFormRegister] = useState({
      firstname:'', lastname:'', email:'', username:'', password:'', phone_number:'', 
    })
    const handleRegister = (event) =>{
        event.preventDefault()
        dispatch(AuthRegister(formRegister))
        console.log(error, "sdfghj")
        // try{
        //   const result = await axios({
        //     method:'POST',
        //     data: addData,
        //     url: 'http://localhost:9511/api/v5/auth/register'
        //   })
        //   console.log(result.data.data.token)
        //   localStorage.setItem('usersignup', JSON.stringify({
        //     isRegister: true,
        //     data: result.data.data
        //   }))
        //   setUserSignup((prevData)=> ({
        //     ...prevData,
        //     isRegister: true,
        //     data: result.data.data, 
        //   }))
        //   alert("Has been registered")
        //   navigation("/login", { replace: true });
        // }catch (error){
        //   console.log(error)
        //   alert("Email Already in Use")
        // }
      }

      useEffect(()=>{
        if(isRegister === true){
            navigation('/login', {replace:true})
        }else{
            // alert("Email Already in Use")
            navigation('/register', {replace:true})
            
        }
      },[isRegister])

    return(
        <>
        <div className="container-main">
            <div className="left-side-signup" style={{backgroundImage: `linear-gradient(rgba(43, 21, 107, 0.5), rgba(43, 21, 107, 0.8)), url(/bg-image.png)` }}>
                <div className="logo-left">
                <img src="logo-font.svg" alt="logo-font" />
                </div>
                <div className="tagline-tickitz">
                <p>wait, watch, wow!</p>
                </div>
            </div>
            <div className="right-side-signup">
                <div className="logo-mobile">
                <img src="logo.svg" alt="logo" />
                </div>
                <h2>Sign Up</h2>
                <p>Fill your additional details</p>
                <form onSubmit={(event)=> handleRegister(event)}>
                <div className="first-name">
                    <label htmlFor="fname">First Name</label>
                    <input type={'firstname'} placeholder="Write your first name" onChange={(event)=> setFormRegister((prevData)=>({
                        ...prevData,
                        firstname: event.target.value
                    }))} required />
                </div>
                <div className="last-name">
                    <label htmlFor="lname">Last Name</label>
                    <input type={'lastname'} placeholder="Write your last name" onChange={(event)=> setFormRegister((prevData)=>({
                        ...prevData,
                        lastname: event.target.value
                    }))} required/>
                </div>
                <div className="phone">
                    <label htmlFor="phone">Phone Number</label>
                    <input type={'phone_number'} placeholder="Write your phone number" onChange={(event)=> setFormRegister((prevData)=>({
                        ...prevData,
                        phone_number: event.target.value
                    }))} required/>
                </div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type={'email'} placeholder="Write your email" onChange={(event)=> setFormRegister((prevData)=>({
                        ...prevData,
                        email: event.target.value
                    }))} required/>
                </div>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type={'username'} placeholder="Write your email" onChange={(event)=> setFormRegister((prevData)=>({
                        ...prevData,
                        username: event.target.value
                    }))} required/>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type={'password'} placeholder="Write your password" onChange={(event)=> setFormRegister((prevData)=>({
                        ...prevData,
                        password: event.target.value
                    })) } required/>
                </div>
                <div className="submit">
                    {/* <button className="button btn-signup" >Sign Up</button> */}
                    {loading ? (
                        <button className="button btn-signup" disabled={true}>Loading..</button>
                        ):(
                        <button className="button btn-signup" >Sign Up</button>
                        )}
                        {error && (
                        <div>{error.message}</div>
                        )}
                    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                </div>
                <div className="signin"></div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register