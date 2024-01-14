import axios from "axios";
import React, { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styledet from "./ProductsDetails.module.css"
import { contextCart } from "../Context/CartContext";
import toast from 'react-hot-toast';
export default function ProductsDetails() {

  let [iconLoader ,setIconLoader] = useState()

  // useParams give me paramter path
  let params = useParams();
  // console.log(params.id);
  // context
  let {addProductContext} = useContext(contextCart);

  async function addProductCart(id){
    setIconLoader(true);

    let res = await addProductContext(id)
    console.log(res)
    if(res.status ==="success"){
      
      toast.success(res.message ,{
        duration:2000,
    
    
    
      })
    }else{
      toast.error("error happend ...")
    }

    setIconLoader(false);

    }
    

  function getProductsDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
    );
  }

  let { data, isLoading } = useQuery("allProductsDetails", getProductsDetails);
  // console.log(data?.data.data);

  if (isLoading) {
    return (
      <div className=" vh-100 d-flex justify-content-center align-items-center">
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
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-4 ">
            <img
              className=" w-100"
              src={data?.data.data.imageCover}
              alt={data?.data.data.title}
            />
          </div>

          <div className="col-md-8 text-center">
            <h1>{data?.data.data.title}</h1>
            <p className=" text-muted">{data?.data.data.description}</p>
            <h5> price : {data?.data.data.price} EGP</h5>

            <button onClick={()=>addProductCart(data.data.data.id)} className={`${styledet.btn} w-100 rounded-3 my-3`}> 
               
               {iconLoader?<i className="fa-solid fa-spinner spinner"></i>: "+ add to cart" }
               
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
