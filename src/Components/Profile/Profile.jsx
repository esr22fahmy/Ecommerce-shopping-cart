import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function Profile() {
  const [UserName, setUserName] = useState(null);

  useEffect(() => {
    let tokenProfile = jwtDecode(localStorage.getItem("tok"));
    //   console.log(tokenProfile.name)
    setUserName(tokenProfile.name);
  }, []);

  if (UserName === null) {
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
        style={{
          marginTop: "8rem",
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
        }}
        className=" container "
      >
        <h1 className=" text-center"> hello {UserName}</h1>
      </div>
    </>
  );
}
