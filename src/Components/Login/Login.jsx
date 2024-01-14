import { Formik, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import {AuthContext} from "../Context/store" 

export default function Login() {
  const { setToken ,token } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [succMessage, setSuccMessage] = useState("");
  const [loadingBtn, setloadingBtn] = useState(false);

  const navigate = useNavigate();


  let user = {
    email: "",
  

    password: "",
  };

  let funVaild = function (value) {
    // console.log(value)

    setErrorMessage("");

    let errors = {};


    // email

    if (!value.email) {
      errors.email = " email is required";
    } else if (
      value.email.includes("@") === false ||
      value.email.includes(".") === false
    ) {
      errors.email = " Invalid email address";
    }

  

    // password

    if (!value.password) {
      errors.password = " password is required";
      // \d  => any number from 0 to 9
    } else if (!value.password.match(/^[a-zA-Z]{4}\d{1,5}$/)) {
      errors.password =
        " Error: The text must start with four letters (uppercase or lowercase), followed by numbers.";
    }
    // console.log(errors)

    return errors;
  };

  async function loginAccount(val) {

    setloadingBtn(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin  ",
        val
      );
      // console.log( "ok" ,data)



      if (data.message === "success") {

        // console.log("helllo")
      // console.log( data.token)

      localStorage.setItem("tok" , data.token)
      
      setToken(data.token)

        setSuccMessage("Account has created successfully");

        setTimeout(() => {
          navigate("/products");
        }, 1000);
        
      }
    } catch (e) {
      // console.log("massage", e);

      setErrorMessage(e.response.data.message);

      // console.log(errorMessage);
    }

    setloadingBtn(false);
  }

  let formFun = useFormik({
    initialValues: user,
    // onSubmit : function(x){
    //   // console.log(x)

    // },

    onSubmit: loginAccount,

    validate: funVaild,
  });

  useEffect(() => {

    if(token !=null)
    {
      navigate("/products")
    }
  
  }, [token])
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}  className=" w-75 m-auto pt-5">
        <h2> Login Now :</h2>

        <form onSubmit={formFun.handleSubmit} className=" pt-5">
       
          {/* email */}

          <label htmlFor="email"> Email:</label>
          <input
            className=" form-control mb-3"
            placeholder="email"
            type="email"
            id="email"
            value={formFun.values.email}
            onChange={formFun.handleChange}
            onBlur={formFun.handleBlur}
          />

          {formFun.errors.email && formFun.touched.email ? (
            <div className="  alert alert-danger">{formFun.errors.email} </div>
          ) : (
            ""
          )}

        

          {/* password */}

          <label htmlFor="password"> Password:</label>
          <input
            className=" form-control mb-3"
            placeholder="password"
            type="password"
            id="password"
            value={formFun.values.password}
            onChange={formFun.handleChange}
            onBlur={formFun.handleBlur}
          />

          {formFun.errors.password && formFun.touched.password ? (
            <div className="  alert alert-danger">
              {formFun.errors.password}{" "}
            </div>
          ) : (
            ""
          )}

        

          {formFun.errors.rePassword && formFun.touched.rePassword ? (
            <div className="  alert alert-danger">
              {formFun.errors.rePassword}{" "}
            </div>
          ) : (
            ""
          )}

          {/* btn */}

          <button
            type=" submit"
            disabled={!formFun.isValid || formFun.dirty === false}
            className="  btn btn-success"
          >
            {loadingBtn ? (
              <FallingLines
                color="#fff"
                width="50"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {errorMessage.length === 0 ? (
          ""
        ) : (
          <div className="  alert alert-danger mt-4">{errorMessage} </div>
        )}

        {succMessage.length === 0 ? (
          ""
        ) : (
          <div className="  alert  alert-success mt-4">{succMessage} </div>
        )}
      </div>
    </>
  );
}
