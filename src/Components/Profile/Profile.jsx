import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Profile() {

const [UserName, setUserName] = useState(null);

useEffect(() => {

  let tokenProfile = jwtDecode(localStorage.getItem("tok"));
//   console.log(tokenProfile.name)
setUserName(tokenProfile.name)
}, [])


if(UserName === null){
    return  <div className=" vh-100 d-flex justify-content-center align-items-center">
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  
  </div>
  }
  
  return (
    <>
<div style={{marginTop:"8rem"}} className=' container '>
    <h1 className=' text-center'> hello {UserName}</h1>
</div>


      
    </>
  )
}
