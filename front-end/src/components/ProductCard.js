import { useState } from 'react';
import PropTypes from 'prop-types';

const ROUTE = 'customer_products';
const ELEMENT = 'element-card';
const IMAGE = 'image-card';
const BUTTON = 'button-card';
const INPUT = 'input-card';
export default function ProductCard({ product: { id, name, price, urlImage } }) {
  const [quantity, setQuantity] = useState(0);

  const handleChangeQuantity = ({ target }) => {
    const { value } = target;
    const newQuantity = Number(value);

    if (newQuantity <= 0) {
      setQuantity(0);
    }

    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 0) return;

    setQuantity(quantity - 1);
  };

  return (
    <div>
      <h3
        data-testid={ `${ROUTE}__${ELEMENT}-title-${id}` }
      >
        { name }
      </h3>
      <span
        data-testid={ `${ROUTE}__${ELEMENT}-price-${id}` }
      >
        { price }
      </span>
      <img
        data-testid={ `${ROUTE}__${IMAGE}-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        data-testid={ `${ROUTE}__${BUTTON}-rm-item-${id}` }
        type="button"
        onClick={ decrementQuantity }
      >
        -
      </button>
      <input
        data-testid={ `${ROUTE}__${INPUT}-quantity-${id}` }
        type="number"
        name="quantity"
        value={ quantity }
        onChange={ handleChangeQuantity }
      />
      <button
        data-testid={ `${ROUTE}__${BUTTON}-add-item-${id}` }
        type="button"
        onClick={ incrementQuantity }
      >
        +
      </button>
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
};
