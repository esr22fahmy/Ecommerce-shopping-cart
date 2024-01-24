import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let contextCart = createContext();

export function CartContextProvider({ children }) {

  const [cartsProduct, setCartsProduct] = useState(null);
  const [numOfCart, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [CartsId, setCartsId] = useState(null);


// add products at cart
  async function addProductContext(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        // el body 
        { "productId": productId },
        { headers: { token: localStorage.getItem("tok") } }
      );

      setCartsProduct(data.data.products)
      setNumOfCartItems(data.numOfCartItems)
      // setTotalCartPrice(data.data.totalCartPrice)

      await getUserCart();

      return data;
    } catch (e) {
      console.log("errror", e);
    }
  }


// Get Logged user cart
// at cart
  async function getUserCart() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        // el body 
        { headers: { token: localStorage.getItem("tok") } }
      );

      setCartsProduct(data.data.products)
      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      // cart id
      setCartsId(data.data._id)


    } catch (e) {
      console.log("errror", e);
    }
  }




// delete product 
async function DeleteProduct(id){

  try {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      // el body 
      { headers: { token: localStorage.getItem("tok") } }
    );

    setCartsProduct(data.data.products);
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
await getUserCart();

return data;

  } catch (e) {
    console.log("errror", e);
  }

}
// for count
async function updateProduct(updateId ,count){

  try {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${updateId}`,

      // el body 
      // count => put after token
      {"count" :count},
      { headers: { token: localStorage.getItem("tok") } },
    ); 

    setCartsProduct(data.data.products);
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);

return data;


  } catch (e) {
    console.log("errror", e);
  }

}






 // Clear all items in the cart
 async function clearCart() {
  try {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token: localStorage.getItem("tok") } }
    );

    setCartsProduct(null);
    setNumOfCartItems(0);
    setTotalCartPrice(0);

    return data;
  } catch (e) {
    console.log("error", e);
  }
}

useEffect(() => {

  getUserCart();

}, [cartsProduct])



  return (


    <contextCart.Provider value={{ addProductContext ,getUserCart , cartsProduct ,numOfCart ,totalCartPrice 
    ,DeleteProduct ,updateProduct ,CartsId ,setCartsProduct ,setNumOfCartItems ,setTotalCartPrice ,clearCart }}>
      {children}
    </contextCart.Provider>
  );
}




