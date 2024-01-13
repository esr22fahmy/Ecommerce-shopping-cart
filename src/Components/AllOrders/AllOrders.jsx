import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function AllOrders() {
  // const [UserId, setUserId] = useState(null);
  const [UserOrders, setUserOrders] = useState(null);

  useEffect(() => {
    let resId = jwtDecode(localStorage.getItem("tok"));
    // setUserId(resId.id);
    //هنا useStateمش هينفع استخدم ال
    // علشان لسه هستنها setData , rerender
    // فهتظهرلي ب null
    getUserAllOrders(resId.id);
  }, []);

  async function getUserAllOrders(UserId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`
      );
      console.log(data);
      setUserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (UserOrders === null) {
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
      <div className=" container pt-5">
        <div className="row g-4">
          {UserOrders.map((order, index) => (
            <div key={index} className="  col-md-6 ">
              <div
                style={{ backgroundColor: "#eee" }}
                className="order  rounded-4 p-3"
              >
                <div className=" container py-3">
                  <div className=" row g-3  justify-content-center ">

                    {order.cartItems?.map((item, idx) => (
                      <div  key={idx} style={{ margin: "5px" }} className="card col-sm-4   ">
                        <div className="  ">
                          <img
                            className="card-img-top"
                            src={item.product.imageCover}
                            alt={item.product.title}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {" "}
                              {item.product.title
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}{" "}
                            </h5>
                            <p className="card-text">Count : {item.count}</p>
                            <p className="card-text">Price : {item.price}</p>
                          
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p
                  style={{ color: " rgb(17,175,17)" }}
                  className=" text-capitalize mt-3"
                >
                  order sent to user with phone {order.shippingAddress.phone}
                  and with details {order.shippingAddress.details} to{" "}
                  {order.shippingAddress.city}
                </p>

                <h5>  <span  style={{ color:"rgb(71, 117, 71)"}}> Payment Method :</span> {order.paymentMethodType}</h5>
                <h5>  <span  style={{ color:"rgb(71, 117, 71)"}}>  Total Price :</span>  {order.totalOrderPrice}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
