import React from "react";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom"
import {AuthLogout} from "../redux/actions/Auth"
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isLogin} = useSelector((state) => state.auth)
  useEffect(()=> {
    if(isLogin === false) {
      navigate('/', {replace: true})
    }
},[isLogin])

  return (
    <>
      <nav className="row-navbar">
        <div className="card-left">
          <div className="logo-navbar">
            <img src="logoTickitz.svg" alt="logo" />
          </div>
          <div className="dashboard">
            <Link style={{ textDecoration: "none" }} to="/">
              Dashboard
            </Link>
          </div>
          <div className="manage-movie">
            <Link style={{ textDecoration: "none" }} to="/#">
              Manage Movie
            </Link>
          </div>
          <div className="manage-schedule">
            <Link style={{ textDecoration: "none" }} to="/#">
              Manage Schedule
            </Link>
          </div>
        </div>
        <div className="card-right">
        {/* <Link to={"/signup"}>
          
        <button className="btn-primary">Sign Up</button>
        </Link> */}
        {isLogin ? (
        <button className="btn-danger" onClick={()=> {
        dispatch(AuthLogout())
          }}>Logout</button>
        ):(
          <Link to={'/login'} ><button className="btn-primary">Sign In</button></Link>
        )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
