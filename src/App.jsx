import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Logout from "./Components/Logout/Logout";
import { AuthProvider } from "./Components/Context/store";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import { CartContextProvider } from "./Components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";
import Cart from "./Components/Cart/Cart";
import Profile from "./Components/Profile/Profile";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";

export default function App() {
  let newClient = new QueryClient();
  let routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {  index: true,
          element: <ProtectedRoute><Products /></ProtectedRoute>},
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element:<ProtectedRoute><Brands /></ProtectedRoute>   },
        { path: "cart", element:<ProtectedRoute><Cart /></ProtectedRoute>   },
        { path: "profile", element:<ProtectedRoute><Profile /></ProtectedRoute>   },
        { path: "payment", element:<ProtectedRoute><Payment /></ProtectedRoute>   },
        { path: "allOrders", element:<ProtectedRoute><AllOrders /></ProtectedRoute>   },

        // : this mean you has parameter
        { path: "productsDetails/:id", element:<ProtectedRoute><ProductsDetails /></ProtectedRoute>},
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        // { path: "logout", element: <Logout /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={newClient}>
      {/* for CartContext */}
      
         <CartContextProvider>
          
          {/* // AuthProvider  => اول حاجه بترن في الموقع */}

      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
         
         
         </CartContextProvider>
{/* library hot toaster */}
         <Toaster/>
    </QueryClientProvider>

  );
}
