
import axios from "axios";
import { createContext, useEffect } from "react";
import  { useState } from "react";
export const FavContext = createContext();

export function FavProvider({children}){

    async function favoriteItem(productId) {
        try {
          let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            // el body
            { "productId": productId },
            { headers: { token: localStorage.getItem("tok") } }
          );
      console.log(data)
          return data;
        } catch (e) {
          console.log("error", e);
        }
      }


return<FavContext.Provider value={{ favoriteItem}} >


    {children}


</FavContext.Provider>
}