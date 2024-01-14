import React from "react";

export default function Footer() {
  return (
    <footer  style={{backgroundColor:"#f0f3f2",  marginTop: "auto"}}>
     <div  className=" container py-5" >
     <h1 className=" text-capitalize"> get the freshcart app </h1>
      <p>
        {" "}
        we will send you a link , open it on your phone to download the app
      </p>

      <div className=" row">
        <div className="col-md-9">

          <input type="email" className=" form-control" placeholder="Email...."/>
        </div>

        <div className="col-md-3">
          <button className=" btn btn-success form-control"> share app link </button>

       </div>

      </div>
     </div>
    </footer>
  );
}
