import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom"

const PublicRoute = ({children, isRestricted=false})=>{
    const navigation = useNavigate()
    const {isLogin} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isLogin == true){
            navigation('/', {replace:true})
        }
    },[isLogin])
    return(children)
}

export default PublicRoute