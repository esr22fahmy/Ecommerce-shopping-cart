import React, { useContext } from "react";
import { contextCart } from "../Context/CartContext";
import { RotatingLines } from "react-loader-spinner";
import styleCart from "./Cart.module.css";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Cart() {
  let { cartsProduct, numOfCart, totalCartPrice, updateProduct, clearCart } =
    useContext(contextCart);

  console.log(cartsProduct);

  // cartContext
  let { DeleteProduct } = useContext(contextCart);

  // count
  async function UpdateCount(updateId, count) {
    let update = await updateProduct(updateId, count);

    if (update.status === "success") {
      toast.success(" Updated Successfully");
    } else {
      toast.error(" Error On Update");
    }
  }


  if (!cartsProduct || cartsProduct.length === 0) {
    return (
      <div className=" vh-100 d-flex justify-content-center align-items-center">
        <h1 className="text-muted">Don't have data in the cart.</h1>
      </div>
    );
  }

  async function removeItem(idProduct) {
    let daletPro = await DeleteProduct(idProduct);

    if (daletPro.status === "success") {
      toast.success("Product Removed Successfully");
    } else {
      toast.error("Error Occurred");
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#eee" }} className=" container mt-3 py-5">
        <h2 className={`${styleCart.ShopCart}`}> shop cart :</h2>
        <h5 className={`${styleCart.TotalePrice}`}>
          Total cart Price : {totalCartPrice} EGP
        </h5>
        {/* <h6>Total Items :{numOfCart}</h6> */}

        <div className=" d-flex  justify-content-between ">
          <button
            onClick={() => clearCart()}
            className="   btn btn-outline-danger text-capitalize "
          >
            {" "}
            clear cart
          </button>

          <Link
            to="/payment"
            className="   btn btn-outline-primary text-capitalize  text-primary"
          >
            {" "}
            confirm payment
          </Link>
        </div>

        {cartsProduct?.map((pro, index) => (
          <div
            key={index}
            className=" row my-2 border-bottom border-3 p-2 align-items-center "
          >
            <div className=" col-sm-1">
              <img src={pro.product.imageCover} className=" w-100" />
            </div>
            <div className=" col-sm-9">
              <h2 className=" h6 text-muted"> {pro.product.title}</h2>
              <h5 className={`${styleCart.TotalePrice} h6 `}>
                price : {pro.price}
              </h5>
              <button
                onClick={() => removeItem(pro.product.id)}
                className="text-muted border-0"
              >
                <i
                  className={`${styleCart.iconRemove} fa-solid fa-trash-can me-2`}
                ></i>
                Remove
              </button>
            </div>
            <div className=" col-sm-2">
              <div className="  d-flex align-items-center">
                <button
                  className={`${styleCart.btnCout}  `}
                  onClick={() => UpdateCount(pro.product.id, pro.count + 1)}
                >
                  {" "}
                  +
                </button>
                <span className=" mx-2">{pro.count}</span>
                <button
                  className={`${styleCart.btnCout} `}
                  onClick={() => UpdateCount(pro.product.id, pro.count - 1)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
