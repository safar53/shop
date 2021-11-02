import { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../MainContext";
import { FiShoppingCart } from 'react-icons/fi'


const Products = (props) => {
  const context = useContext(MainContext);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  return (
    <div className="container">
      <h2>
        <span></span>
        <Link to="/cart"><FiShoppingCart />Cart ({totalCartCount})</Link>
      </h2>
      {context.state.bookList.map((book) => (
        <div className="book" key={book.id}>
          <img src={book.image} alt={book.name} />
          <div className="book-info">
            <h3>{book.name}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Price:</b> {book.price}$</p>
            <button className="add-to-cart" onClick={() => context.addToCart(book)}>
              Add to basket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
