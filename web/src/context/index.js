import React, { useState, useEffect, useContext } from "react";

const Context = React.createContext();

export default function ContextProviver(props) {
  const { children } = props;

  const [cart, setCart] = useState([]);

  const value = {
    cart,
    setCart,
  };

  useEffect(() => {
    const _cart = localStorage.getItem("cart") || "[]";
    setCart(JSON.parse(_cart))
  }, [])

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const getContext = () => useContext(Context);
