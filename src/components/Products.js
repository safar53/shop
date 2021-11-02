import { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../MainContext";
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi'


const Products = (props) => {
  const context = useContext(MainContext);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  return (
    <div className="container">
      <div className="header">
        <div className="header-top"><FiShoppingBag />Shop now</div>
        <div className="navbar">
          <Link to="/cart"><FiShoppingCart />Cart ({totalCartCount})</Link>
        </div>
      </div>
      <div className="content">
        {context.state.bookList.map((book) => (
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
              <button className="add-to-cart" onClick={() => context.addToCart(book)}>
                Add to basket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
