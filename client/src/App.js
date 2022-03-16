import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import MarketPlace from './pages/MarketPlace';
import ProductDetails from './pages/ProductDetails';
import UserDetails from "./pages/UserDetails";
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import DeliveryPage from './pages/DeliveryPage';
import Thanks from "./pages/Thanks";
import OrderDetails from './pages/OrderDetails';
import LoginMessage from './pages/LoginMessage';
import EmptyCart from './components/EmptyCart';
import Admin from './pages/Admin';
import AdminProducts from './components/AdminProducts';
import AdminProductUpdate from "./components/AdminProductUpdate";
import AdminOrders from './components/AdminOrders';
import AdminUsers from './components/AdminUsers';
function App() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cart,setCart] = useState([]);
  return (
    <UserContext.Provider value= {{user,setUser,cart,setCart}}>
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element = {<Home />} />
    <Route path="/cart" element = {<Cart />} />
    <Route path="/login" element = {<Login />} />
    <Route path="/register" element = {<Register />}/>
    <Route path="/marketplace" element = {<MarketPlace />} />
    <Route path="/product/:id" element = {<ProductDetails/>}/>
    <Route path="/account/:id" element = {<UserDetails />} />
    <Route path="/delivery" element = {<DeliveryPage />}/>
    <Route path="/thanks" element = {<Thanks />}/>
    <Route path="/order/:id" element = {<OrderDetails />} />
    <Route path="/admin" element = {<Admin />} />
    <Route path="/admin/products" element = {<AdminProducts />} />
    <Route path="/admin/update/:id" element = {<AdminProductUpdate />} />
    <Route path="/admin/orders" element = {<AdminOrders />} />
    <Route path="/admin/users" element = {<AdminUsers />} />
    <Route path="/message" element = {<LoginMessage />} />
    <Route path="/emptycart" element = {<EmptyCart />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
