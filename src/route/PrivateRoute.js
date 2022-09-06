import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom"

const PrivateRoute = ({children}) =>{
    const navigation = useNavigate()
    const {isLogin} = useSelector((state)=>state.login)

    useEffect(()=>{
        if(isLogin == false){
            navigation('/login', {replace:true})
        }
    },[isLogin])
    return(children)
}

export default PrivateRoute