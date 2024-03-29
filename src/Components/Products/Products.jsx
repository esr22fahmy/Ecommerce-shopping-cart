import React, { useContext, useEffect, useState, useRef } from "react";
import { Blocks } from "react-loader-spinner";
import axios from "axios";
import styleProducts from "./Products.module.css";
import { useQuery } from "react-query";
import HomeSlick from "../HomeSlick";
import CategoriesSlick from "../CategoriesSlick/CategoriesSlick";
import { Link } from "react-router-dom";
import { contextCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import {FavContext} from "../../Components/Context/CartContext"

export default function Products() {
  const productsRef = useRef();
  const { favoriteItem } = useContext(contextCart);

// console.log(favoriteItem)
  // context

  let { addProductContext } = useContext(contextCart);

  async function onclickAddProduct(id) {
    let res = await addProductContext(id);
    // console.log(res)
    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2000,
      });
    } else {
      toast.error("error happend ...");
    }
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("allProducts", getProducts);
  // console.log(x)

  // console.log(data?.data.data)

  if (isLoading) {
    return (
      <div className=" vh-100 d-flex justify-content-center align-items-center">
       <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <HomeSlick />

      <CategoriesSlick />
      <div
        ref={productsRef}
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        className=" container py-5"
      >
        <div className=" row">
          {data?.data.data.map((pr, index) => (
            <div key={index} className=" col-md-2  ">
              <Link to={`/productsDetails/${pr.id}  `}>
                <div className=" product">
                  <img
                    className={`${styleProducts.imgProducts}  w-100 `}
                    src={pr.imageCover}
                    alt="products"
                  />

                  {/* <h6 className={`${styleProducts.colorCategory} mt-3`}>
                    {pr.category.name}
                  </h6> */}

                  <div className=" d-flex justify-content-between mt-3">
                  <h6 className={`${styleProducts.colorCategory} `}>
                    {pr.category.name}
                  </h6>
                    
                  </div>
                  <h5>
                    {pr.title.length > 15
                      ? pr.title.slice(0, 15) + `...`
                      : pr.title}
                  </h5>
                  <div className=" d-flex justify-content-between">
                    <p>{pr.price} EGP</p>

                    <p>
                      {pr.ratingsAverage}
                      <i
                        className={`${styleProducts.starIcon} fa-solid fa-star`}
                      ></i>
                    </p>
                  </div>
                </div>
              </Link>
              {/* <button  onClick={() => favoriteItem(pr.id)} className=" btn  btn-danger w-100">
                      <i   
 className="fa-solid fa-heart text-white"></i>
                    </button> */}

              <button
                onClick={() => onclickAddProduct(pr.id)}
                className={`${styleProducts.btn} w-100 rounded-3 my-3`}
              >
                {" "}
                + add to cart{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
