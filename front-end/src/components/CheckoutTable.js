import PropTypes from 'prop-types';

import deleteIcon from '../images/deleteIcon.svg';

import '../styles/components/Header.css';

function CheckoutTable({ cart, onRemoveProduct }) {
  const cartValue = localStorage.getItem('cartValue');

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quant</th>
          <th>Valor Unit</th>
          <th>Sub-Total</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product, i) => (
          <tr key={ product.id }>
            <td
              id={ product.id }
              data-testid={
                `customer_checkout__element-order-table-item-number-${i}`
              }
            >
              {i + 1}
            </td>
            <td
              id={ product.id }
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              {product.name}
            </td>
            <td
              id={ product.id }
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              { product.quantity }
            </td>
            <td
              id={ product.id }
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              {product.price.toString().replace('.', ',')}
            </td>
            <td
              id={ product.id }
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              {
                (product.quantity * product.price)
                  .toFixed(2).toString().replace('.', ',')
              }
            </td>
            <td>
              <button
                className="table-remove-button"
                type="button"
                id={ product.id }
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                onClick={ (e) => {
                  let newCartValue = parseFloat(cartValue);
                  const newCart = cart.filter((p) => {
                    console.log(e.target);
                    const status = p.id !== Number(e.target.id);
                    if (!status) newCartValue -= p.quantity * p.price;
                    return status;
                  });
                  localStorage.setItem(
                    'cartValue',
                    newCartValue.toFixed(2),
                  );
                  console.log(newCart);
                  localStorage.setItem(
                    'cart',
                    JSON.stringify(newCart),
                  );
                  onRemoveProduct(newCart);
                } }
              >
                <img
                  id={ product.id }
                  className="table-remove-icon"
                  alt="Ícone de remover"
                  src={ deleteIcon }
                />
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td
            colSpan="6"
            className="table-total-price"
            data-testid="customer_checkout__element-order-total-price"
          >
            {
              `Total: ${parseFloat(cartValue).toFixed(2).toString().replace('.', ',')}`
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}

CheckoutTable.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};

export default CheckoutTable;
