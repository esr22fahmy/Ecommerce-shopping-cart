import React from 'react'
import imgError from "../../images/error.svg"

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} className=' w-50 mx-auto my-5 text-center'>
      <img src={imgError} />
      
    </div>
  )
}
