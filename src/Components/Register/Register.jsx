import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [succMessage, setSuccMessage] = useState("");
  const [loadingBtn, setloadingBtn] = useState(false);

  const navigate = useNavigate();

  let user = {
    name: "",
    email: "",
    phone: "",

    password: "",
    rePassword: "",
  };

  let funVaild = function (value) {
 
    setErrorMessage("");

    let errors = {};

    if (!value.name) {
      errors.name = " name is required";
    } else if (value.name.length < 2) {
      errors.name = " name min length 2";
    } else if (value.name.length > 15) {
      errors.name = " name max length 15";
    }

    // email

    if (!value.email) {
      errors.email = " email is required";
    } else if (
      value.email.includes("@") === false ||
      value.email.includes(".") === false
    ) {
      errors.email = " Invalid email address";
    }

    // phone

    if (!value.phone) {
      errors.phone = " phone is required";
    } else if (!value.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
      errors.phone = " Invalid phone";
    }

    // password

    if (!value.password) {
      errors.password = " password is required";
      // \d  => any number from 0 to 9
    } else if (!value.password.match(/^[a-zA-Z]{4}\d{1,5}$/)) {
      errors.password =
        " Error: The text must start with four letters (uppercase or lowercase), followed by numbers.";
    }

    // repassword

    if (!value.rePassword) {
      errors.rePassword = " rePassword is required";
      // \d  => any number from 0 to 9
    } else if (value.rePassword !== value.password) {
      errors.rePassword = " password and rePassword don't match ";
    }

    // console.log(errors)

    return errors;
  };

  async function registerNewUser(val) {
  
    setloadingBtn(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup  ",
        val
      );
      // console.log( "ok" ,data)

      if (data.message === "success") {
        // console.log("helllo")
        setSuccMessage("Account has created successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (e) {
      console.log("massage", e);

      setErrorMessage(e.response.data.message);

      console.log(errorMessage);
    }

    setloadingBtn(false);
  }

  let formFun = useFormik({
    initialValues: user,
    // onSubmit : function(x){
    //   // console.log(x)

    // },

    onSubmit: registerNewUser,

    validate: funVaild,
  });
  return (
    <>
      <div style={{marginTop:"8rem" ,display: "flex", flexDirection: "column", minHeight: "100vh" }} className=" w-75 m-auto py-5">
        <h2> Register Now :</h2>

        <form onSubmit={formFun.handleSubmit} className=" pt-5">
          <label htmlFor="name"> Name:</label>
          <input
            className=" form-control mb-3"
            placeholder="Name"
            type="text"
            id="name"
            value={formFun.values.name}
            onChange={formFun.handleChange}
            onBlur={formFun.handleBlur}
          />
          {formFun.errors.name && formFun.touched.name ? (
            <div className="  alert alert-danger">{formFun.errors.name} </div>
          ) : (
            ""
          )}
          {/* email */}

          <label htmlFor="email"> email:</label>
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

          {/* phone*/}

          <label htmlFor="phone"> phone:</label>
          <input
            className=" form-control mb-3"
            placeholder="phone"
            type="tel"
            id="phone"
            value={formFun.values.phone}
            onChange={formFun.handleChange}
            onBlur={formFun.handleBlur}
          />
          {formFun.errors.phone && formFun.touched.phone ? (
            <div className="  alert alert-danger">{formFun.errors.phone} </div>
          ) : (
            ""
          )}

          {/* password */}

          <label htmlFor="password"> password:</label>
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

          {/* rePassword */}

          <label htmlFor="rePassword"> rerepassword:</label>
          <input
            className=" form-control mb-3"
            placeholder="rePassword"
            type="password"
            id="rePassword"
            value={formFun.values.rePassword}
            onChange={formFun.handleChange}
            onBlur={formFun.handleBlur}
          />

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
              "Register"
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
