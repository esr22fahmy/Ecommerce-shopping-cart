import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import styleProducts from "./Products.module.css";

export default function Products() {
  const [items, setitems] = useState(null);

  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data.data)
    setitems(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {items ? (
        <>
          <div className=" container py-5">
            <div className=" row">
              {items.map((pr, index) => (
                <div key={index} className=" col-md-2">
                  <div className=" product">
                    {/* <img className=' w-100' src={ require("")} alt='products'/> */}
                     <img className=' w-100' src={pr.imageCover} alt='products'/> 

                    <h6 className={`${styleProducts.colorCategory}`}>{pr.category.name}</h6>
                    <h5>{pr.title}</h5>
                    <div className=" d-flex justify-content-between">
                    <p>{pr.price} EGP</p>

                    <p>{pr.ratingsAverage} 
                    <i className={`${styleProducts.starIcon} fa-solid fa-star`}></i>
                    </p>
                    </div>
                 

                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
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
      )}
    </>
  );
}
