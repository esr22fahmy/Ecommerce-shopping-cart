import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {

const [dataCategories, setDataCategories] = useState()   
  async function AllCategories(){

    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories"
  )
      // console.log(data.data)
      setDataCategories(data)
      
    } catch (error) {
      console.log(error)

    }

  }

  useEffect(() => {
    AllCategories()
  }, [])

  return (
    <div className=' mt-5' style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className=' container'>
        <div className=' row'>
        {dataCategories?.data.map((cate, index) => (
          <div key={index} className=' col-md-2'>
            <img className=' w-100 h-75' src={cate.image}/>
            <h5  className=' text-center mt-3'>{cate.name}</h5>

          </div>
             


              ))}

        </div>

      </div>
    </div>
  )
}
