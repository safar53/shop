import { useContext } from "react";
import MainContext from "../MainContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'

const Cart = () => {
  const context = useContext(MainContext);

  const totalCartAmount = context.state.cart
    .reduce((total, book) => (total = total + book.price * book.count), 0)
    .toFixed(2);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  return (
    <div className="container">
      <div className="header">
        <div className="header-top"><FiShoppingBag />Shop now</div>
        <div className="navbar">
          <Link to="/shop"><FiArrowLeft />Book List</Link> <span><FiShoppingCart />Cart ({totalCartCount})</span>
        </div>
      </div>
      <div className="content">
        <div className="total-amount">Total Cart Amount: {totalCartAmount}$</div>
        {context.state.cart.map((book) => (
          <div className="book-container" key={book.id}>
            <div className="book-img">
              <div className="aspect-ratio-container">
                <img className="aspect-ratio-item" src={book.image} alt={book.name} />
              </div>
            </div>
            <div className="book-info">
              <h3 className="book-name">{book.name}</h3>
              <p className="author">Author: {book.author}</p>
              <p className="price">Price: {book.price}$</p>
              <p className="total-price">Total: {(book.price * book.count).toFixed(2)}$</p>
              <p className="count">Count: {book.count}</p>
              <button className="increase" onClick={() => context.decrease(book.id)}><FiMinus /></button>
              <button className="decrease" onClick={() => context.increase(book.id)}><FiPlus /></button>
              <button className="remove-from-cart" onClick={() => context.removeFromCart(book.id)}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
