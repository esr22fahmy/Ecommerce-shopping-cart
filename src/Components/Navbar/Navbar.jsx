import React, { useContext } from "react";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";
import imgLogo from "../../images/2jv4Mf-LogoMakr.png";
import { AuthContext } from "../Context/store";
import { useNavigate } from "react-router-dom";
import { contextCart } from "../Context/CartContext";
import AllOrders from '../AllOrders/AllOrders';

export default function Navbar() {
  const { setToken, token } = useContext(AuthContext);
  const navigate = useNavigate();

  let { numOfCart } = useContext(contextCart);

  function logOutFun() {
    // localStorage.removeItem("tok")
    // setToken(null)
    // navigate("/login")

    try {
      localStorage.removeItem("tok");
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link  className="navbar-brand">
            <img className="imglogo" src={imgLogo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <>
                {" "}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/products"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>

                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li> */}

                  <li className="nav-item">
                    <Link className="nav-link" to="/allOrders">
                      AllOrders
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/cart">
                      Cart
                      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger">
                        {numOfCart}

                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <></>
            )}

            {/*  */}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <i className="fa-brands me-2  fa-facebook"></i>

                <i className="fa-brands me-2 fa-twitter"></i>

                <i className="fa-brands me-2 fa-whatsapp"></i>

                <i className="fa-brands me-2 fa-linkedin"></i>
              </li>

              {token ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link " to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span onClick={logOutFun} className="nav-link ">
                      Logout
                    </span>
                  </li>
                
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
