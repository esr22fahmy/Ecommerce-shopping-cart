import { createContext, useEffect } from "react";
import  { useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){

const [token, setToken] = useState(null);

// useEffect =>  هتشتغل لما اعمل ريفرش للموقع
// useEffect(function()  {
    // console.log("refresh")
//     if(localStorage.getItem("tok") !== null){
//         setToken(localStorage.getItem("tok"))
//     }
// }, [])

useEffect(() => {
    // قم بتعيين قيمة token من localStorage إذا كانت متاحة
    const storedToken = localStorage.getItem("tok");
    if (storedToken !== null) {
      setToken(storedToken);
    }
  }, []);

return<AuthContext.Provider value={{token, setToken }} >


    {children}


</AuthContext.Provider>

}