import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function AllOrders() {
  // const [UserId, setUserId] = useState(null);
  const [UserOrders, setUserOrders] = useState(null);

  useEffect(() => {
    let resId = jwtDecode(localStorage.getItem("tok"));
    // setUserId(resId.id);

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
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        className=" container pt-5"
      >
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
                      <div
                        key={idx}
                        style={{ margin: "5px" }}
                        className="card col-sm-4   "
                      >
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
                  style={{ color: " rgb(88,105,168)" }}
                  className=" text-capitalize mt-3"
                >
                  order sent to user with phone {order.shippingAddress.phone}
                  and with details {order.shippingAddress.details} to{" "}
                  {order.shippingAddress.city}
                </p>

                <h5>
                  {" "}
                  <span style={{ color: "rgb(40,47,131)" }}>
                    {" "}
                    Payment Method :
                  </span>{" "}
                  {order.paymentMethodType}
                </h5>
                <h5>
                  {" "}
                  <span style={{ color: "rgb(40,47,131)" }}>
                    {" "}
                    Total Price :
                  </span>{" "}
                  {order.totalOrderPrice}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
