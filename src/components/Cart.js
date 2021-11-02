import { useContext } from "react";
import MainContext from "../MainContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi'

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
      <h2>
        <Link to="/shop"><FiArrowLeft />Book List</Link> <span><FiShoppingCart />Cart ({totalCartCount})</span>
      </h2>

      <h3 className="total-amount">Total Cart Amount: {totalCartAmount}$</h3>

      {context.state.cart.map((book) => (
        <div className="book" key={book.id}>
          <img src={book.image} alt={book.name} />
          <div className="book-info">
            <h3>{book.name}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Price:</b> {book.price}$</p>
            <p><b>Total:</b> {(book.price * book.count).toFixed(2)}$</p>
            <p><b>Count:</b> {book.count}</p>
            <button className="increase" onClick={() => context.decrease(book.id)}><FiMinus /></button>
            <button className="decrease" onClick={() => context.increase(book.id)}><FiPlus /></button>
            <button className="remove-from-cart" onClick={() => context.removeFromCart(book.id)}>
              Remove from Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
