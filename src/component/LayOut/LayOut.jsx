import React from "react"
import { Navbar } from "../navbar/Navbar"
import Footer from "../footer/Footer"

 React
 export const MainLayOut= (props)=>{
  return(
    <div className="">
         <Navbar/>
      <div className="py-2">
        {props.children}
      </div>
      <Footer/>
    </div>
     )
}