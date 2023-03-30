import PropTypes from 'prop-types';

export default function ProductCard({ product: { id, name, price, urlImage } }) {
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-card';
  const IMAGE = 'image-card';
  const BUTTON = 'button-card';
  const INPUT = 'input-card';
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
        data-testid={ `${ROUTE}__${BUTTON}-add-item-${id}` }
        type="button"
      >
        +
      </button>
      <span data-testid={ `${ROUTE}__${INPUT}-quantity-${id}` }>Quantidade</span>
      <button
        data-testid={ `${ROUTE}__${BUTTON}-rm-item-${id}` }
        type="button"
      >
        -
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};
