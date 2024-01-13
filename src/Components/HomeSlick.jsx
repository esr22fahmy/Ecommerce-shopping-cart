import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlick() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <div className=" container mt-3">
      <div className="row gx-0">
        <div className=" col-8 col-md-9 ">
          <Slider {...settings}>
            <div>
              <img
                style={{ width: "100%", height: "400px" }}
                src={require("../images/bagSlider.jpg")}
              />
            </div>
            <div>
              <img
                style={{ width: "100%", height: "400px" }}
                src={require("../images/shoes2.jpg")}
              />
            </div>
            <div>
              <img
                style={{ width: "100%", height: "400px" }}
                src={require("../images/clothes.jpg")}
              />
            </div>
            <div>
              <img
                style={{ width: "100%", height: "400px" }}
                src={require("../images/produces.jpg")}
              />
            </div>
            <div>
              <img
                style={{ width: "100%", height: "400px" }}
                src={require("../images/vag.jpg")}
              />
            </div>
          </Slider>
        </div>

      <div className="col-4 col-md-3">

    <img
                style={{ width: "100%", height: "200px" }}
                src={require("../images/con.jpg")}
              />
        <img
                style={{ width: "100%", height: "200px" }}
                src={require("../images/do.jpg")}
              />
      
      
      </div>
      </div>
    </div>
  );
}
