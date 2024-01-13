import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import styleProducts from "./Products.module.css";
import { useQuery } from "react-query";
import HomeSlick from "../HomeSlick";
import CategoriesSlick from "../CategoriesSlick/CategoriesSlick";
import { Link } from "react-router-dom";
import { contextCart } from "../Context/CartContext";
import toast from 'react-hot-toast';


export default function Products() {


  // context
  
let {addProductContext}=useContext(contextCart);

async function onclickAddProduct(id){

let res = await addProductContext(id)
// console.log(res)
if(res.status ==="success"){
  // messageاللي بعد ال  objectال  
  // ده option ممكن اتكتبه وممكن لا
  // option دايما بيكون objectال
  // toat => lib
  toast.success(res.message ,{
    // success   دي في المكتبه بتعمل علامه الصح جنب الكلام
    duration:2000,



  })
}else{
  toast.error("error happend ...")
}

}


  function getProducts() {

    return axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
  }

let {data ,isLoading} = useQuery ("allProducts" ,getProducts )
// console.log(x)

// ? علشان ال data ممكن تيجي وممكن في الاول تكون لسه مجاتش
// console.log(data?.data.data)


if(isLoading){
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
    <HomeSlick/>

    <CategoriesSlick/>
<div className=" container py-5">
            <div className=" row">
              {data?.data.data.map((pr, index) => (
                <div key={index} className=" col-md-2  ">
               <Link  to={`/productsDetails/${pr.id}  `}>
               <div className=" product">
                     <img className={`${styleProducts.imgProducts}  w-100 `} src={pr.imageCover} alt='products'/> 

                    <h6 className={`${styleProducts.colorCategory} mt-3`}>{pr.category.name}</h6>
                    <h5>{pr.title.length > 15 ? pr.title.slice(0, 15)+`...` : pr.title}</h5>
                    <div className=" d-flex justify-content-between">
                    <p>{pr.price} EGP</p>

                    <p>{pr.ratingsAverage} 
                    <i className={`${styleProducts.starIcon} fa-solid fa-star`}></i>
                    </p>
                    </div>
                 
      
                  </div>
               
               
               
               
               </Link>
               <button onClick={()=>onclickAddProduct(pr.id)} className={`${styleProducts.btn} w-100 rounded-3 my-3`}> + add to cart </button>

                </div>
              ))}
            </div>
          </div>

    </>
  );
}
