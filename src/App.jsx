import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";



function App() {
  const {cartItems}=useSelector((store)=>store.cart)
  const {isLoading}=useSelector((store)=>store.cart)
  const {error}=useSelector((store)=>store.cart)
  const {isOpen}=useSelector((store)=>store.modal)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(calculateTotals());
  },[cartItems])

  useEffect(()=>{
    dispatch(getCartItems());
  },[])

  if(isLoading){
    return <div className="loading">
      <h1>Loading</h1>
    </div>
  }

  if(error){
    return <h2>{error}</h2>
  }

  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>
}
export default App;
