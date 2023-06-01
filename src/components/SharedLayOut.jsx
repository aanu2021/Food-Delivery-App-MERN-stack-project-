import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SharedLayOut = ()=> {
    return (<>
       <div><Navbar/></div>
       <div><Outlet/></div>
       <div><Footer/></div>
    </>);
}

export default SharedLayOut;