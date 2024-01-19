import axios from 'axios'
import React, { useEffect } from 'react'

export default function Brands() {

  async function AllBrands(){

    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands"
  )
      // console.log(data)
      
    } catch (error) {
      console.log(error)

    }

  }

  useEffect(() => {
    AllBrands()
  }, [])
  return (
    <div className=' mt-5' style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
     
    </div>
  )
}
