import React,{ Component}from "react";
import {Outlet}from 'react-router-dom'
import {Navigate} from "react-router-dom";

let authenticate=()=>{
    const token=sessionStorage.getItem('token');
    return token?true:false;
}

const PrivateRoute=()=>{
    return authenticate()?<Outlet/>:<Navigate to={'/login'}/>


}
export default PrivateRoute;