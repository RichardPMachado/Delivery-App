import { useState } from 'react';
import PropTypes from 'prop-types';
import replaceDotToComma from '../utils/replaceDotToComma';

import addIcon from '../images/addIcon.svg';
import removeIcon from '../images/removeIcon.svg';

import '../styles/components/ProductCard.css';

const ROUTE = 'customer_products';
const ELEMENT = 'element-card';
const IMAGE = 'img-card';
const BUTTON = 'button-card';
const INPUT = 'input-card';
export default function ProductCard({
  product: { id, name, price, urlImage },
  updateCart,
}) {
  const [quantity, setQuantity] = useState(0);

  const handleChangeQuantity = ({ target }) => {
    const { value } = target;
    const newQuantity = Number(value);

    if (newQuantity <= 0) {
      setQuantity(0);
    }

    setQuantity(newQuantity);

    updateCart({ id, name, price, urlImage, quantity: newQuantity });
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);

    updateCart({ id, name, price, urlImage, quantity: quantity + 1 });
  };

  const decrementQuantity = () => {
    if (quantity === 0) return;

    setQuantity(quantity - 1);

    updateCart({ id, name, price, urlImage, quantity: quantity - 1 });
  };

  return (
    <div className="product-card-container">
      <div className="product-card-price-tag-container">
        <div
          className="product-card-price-tag"
          data-testid={ `${ROUTE}__${ELEMENT}-price-${id}` }
        >
          { `R$ ${replaceDotToComma(price)}` }
        </div>
      </div>
      <img
        className="product-card-image"
        data-testid={ `${ROUTE}__${IMAGE}-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `${ROUTE}__${ELEMENT}-title-${id}` }
      >
        { name }
      </p>

      <div className="quantity-div-content">
        <button
          className="quantity-button"
          data-testid={ `${ROUTE}__${BUTTON}-rm-item-${id}` }
          type="button"
          onClick={ decrementQuantity }
        >
          <img
            className="quantity-icon"
            alt="Ícone de remover"
            src={ removeIcon }
          />
        </button>
        <input
          className="quantity-input"
          data-testid={ `${ROUTE}__${INPUT}-quantity-${id}` }
          type="number"
          name="quantity"
          value={ quantity }
          onChange={ handleChangeQuantity }
        />
        <button
          className="quantity-button"
          data-testid={ `${ROUTE}__${BUTTON}-add-item-${id}` }
          type="button"
          onClick={ incrementQuantity }
        >
          <img
            className="quantity-icon"
            alt="Ícone de adicionar"
            src={ addIcon }
          />
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  updateCart: PropTypes.func.isRequired,
};
