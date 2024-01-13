// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useQuery } from "react-query";
// import axios from "axios";
// import { MutatingDots } from "react-loader-spinner";

// export default function CategoriesSlick() {
//   function getCategories() {
//     return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
//   }

//   let { data, isLoading } = useQuery("allCategories", getCategories);

//   // console.log(data?.data.data);

//   if (isLoading) {
//     return (
//       <div className=" vh-100 d-flex justify-content-center align-items-center">
//         <MutatingDots
//           visible={true}
//           height="100"
//           width="100"
//           color="#4fa94d"
//           secondaryColor="#4fa94d"
//           radius="12.5"
//           ariaLabel="mutating-dots-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//         />
//       </div>
//     );
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 7,
//     slidesToScroll: 3,
//     arrows: false,
//     autoplay:true
//   };

//   const firstFiveCategories = data?.data.data.slice(0, 5);
//   const lastFiveCategories = data?.data.data.slice(-5);
//   return (

    
//     <div className=" container mt-5">

//         <h2 className=" h4 text-capitalize"> shop popular Categories </h2>
//       <Slider {...settings}>

// {data?.data.data.map((category, index) => (
//               <div key={index}>
//               <img
//                 style={{ width: "100%", height: "200px" }}
//                 src={category.image}
//               />
            

//               <h6 className=" mt-3">{category.name}</h6>
//             </div>
//         ))}


       
//       </Slider>
//     </div>
//   );
// }


import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";


export default function CategoriesSlick() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("allCategories", getCategories);

  if (isLoading) {
    return (
      <div className=" vh-100 d-flex justify-content-center align-items-center">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          dots: true, // or set it to false if you don't want dots
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true, // or set it to false if you don't want dots
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false, // Adjust dots based on your preference
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false, // Adjust dots based on your preference
        },
      },
    ],
  };
  
  const firstFiveCategories = data?.data.data.slice(0, 5);
  const lastFiveCategories = data?.data.data.slice(-5);

  return (
    <div className="container mt-5">
      <h2 className="h4 text-capitalize">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data?.data.data.map((category, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", height: "200px" }}
              src={category.image}
              alt={category.name}
            />
            <h6 className="mt-3">{category.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
