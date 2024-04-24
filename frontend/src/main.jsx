import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route } from "react-router-dom";
import {createBrowserRouter} from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import ProductList from "./pages/Admin/ProductList.jsx";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Auth/Register";
import AllProduct from "./pages/Admin/AllProduct.jsx";
// Auth
import Favorites from "./pages/Products/Favorites.jsx";
import Login from "./pages/Auth/Login.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList";
import ProductUpdate from "./pages/Admin/productUpdate"
import Home from "./Home.jsx";
import ProductDetails from "./pages/Products/ProductDetails";
import Cart from "./Cart.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
          <Route path="" element={<PrivateRoute />}>

            <Route path="/profile" element={<Profile/>}/>
          </Route>

    <Route path="/admin" element={<AdminRoute/>}> 
    <Route path='userlist' element={<UserList/>}/>
    <Route path='categorylist' element={<CategoryList/>}/>
    <Route path='productlist' element={<ProductList/>}/>
    <Route path='allproducts' element={<AllProduct/>}/>

    <Route path="product/update/:_id" element={<ProductUpdate />} />
    </Route>

    </Route>



  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router}/>
  </Provider>

)
