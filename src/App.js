import { useState } from "react";
import "./styles.css";
import { Route } from "react-router-dom";
import MainContext from "./MainContext";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { data } from "./data";

export default function App() {
  const [state, setState] = useState({
    bookList: data,
    cart: [],
  });

  const addToCart = (book) =>
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === book.id)
        ? state.cart.map((cartItem) =>
            cartItem.id === book.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        : [...state.cart, { ...book, count: 1 }],
    });
  
  const removeFromCart = (id) => setState({
    ...state,
    cart: state.cart.filter(cartItem => cartItem.id !== id)
  })

  const increase = (id) =>
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ),
    });
  const decrease = (id) =>
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      ),
    });

  return (
    <MainContext.Provider
      value={{ state: state, addToCart, removeFromCart, increase, decrease }}
    >
      <div className="App">
        <Route exact path="/shop" component={Products} />
        <Route path="/cart" component={Cart} />
      </div>
    </MainContext.Provider>
  );
}
