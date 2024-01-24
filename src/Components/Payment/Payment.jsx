import React, { useContext, useEffect, useState } from "react";
import { contextCart } from "../Context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Payment() {
  let { CartsId, setCartsProduct, setNumOfCartItems, setTotalCartPrice  ,clearCart} =
    useContext(contextCart);
  let [phoneVale, setPhone] = useState("");
  let [CityValue, setCity] = useState("");
  let [DetailsValue, setDetails] = useState("");

  async function confirmCash() {
  

    let shippingDetails = {
      // object at api
      shippingAddress: {
        details: DetailsValue,
        phone: phoneVale,
        city: CityValue,
      },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartsId}`,
        shippingDetails,

        { headers: { token: localStorage.getItem("tok") } }
      );
      // console.log(data);

      if (data.status === "success") {
        toast.success("Order Successfully Initalized");
        // Clear input fields after successful order
        setPhone("");
        setCity("");
        setDetails("");
        // clear cart
        setCartsProduct([]);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
      } else {
        toast.error("Error On Creating");
      }
    } catch (error) {
      toast.error("Error On Creating");

      console.log(error);
    }
  }

  // online payment

  async function confirmOnline() {
    let shippingDetails = {
      // object at api
      shippingAddress: {
        details: DetailsValue,
        phone: phoneVale,
        city: CityValue,
      },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartsId}`,
        shippingDetails,
        {
          headers: { token: localStorage.getItem("tok") },
          params: { url: `http://localhost:3000/${window.location.port}` },
        }
      );
      console.log(data);
      if (data.status === "success") {
        toast.success("Order Successfully Initialized");
        setPhone("");
        setCity("");
        setDetails("");
        
        // Clear the cart data from the context
        // setCartsProduct([]);
        // setNumOfCartItems(0);
        // setTotalCartPrice(0);
        clearCart();

      } else {
        toast.error("Error On Creating");
      }

      window.open(data.session.url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}  className="container py-5">
        <form>
          <label htmlFor="phone">Phone :</label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone"
            className=" mb-3 form-control"
            required
            value={phoneVale}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* City */}
          <label htmlFor="city">City :</label>
          <input
            id="city"
            type="text"
            placeholder="City"
            className=" mb-3 form-control"
            required

            value={CityValue}
            onChange={(e) => setCity(e.target.value)}
          />

          {/* Details */}
          <label htmlFor="details">Details :</label>
          <textarea
            id="details"
            type="text"
            placeholder="Details"
            className=" mb-3 form-control"
            value={DetailsValue}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>

          {/*  type="button" => el form doesn't do reload when onClick about button*/}
          <button
            style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
            type="button"
            onClick={confirmCash}
            className=" btn  btn-light text-capitalize"
          >
            {" "}
            confirm cash Payment
          </button>
          <span className=" mx-2"></span>
          <button
            style={{ backgroundColor: "#333333", color: "#ffffff" }}
            type="button"
            onClick={confirmOnline}
            className=" btn  btn-dark  text-capitalize"
          >
            {" "}
            confirm Online Payment
          </button>
        </form>
      </div>
    </>
  );
}
