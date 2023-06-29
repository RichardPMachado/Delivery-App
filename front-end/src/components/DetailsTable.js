import PropTypes from 'prop-types';

import '../styles/components/Header.css';

function DetailsTable({ sale }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitario</th>
          <th>Sub-Total</th>
        </tr>
      </thead>
      <tbody>
        {sale && sale.salesProducts && sale.salesProducts.map((product, i) => (
          <tr key={ i + 1 }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number${i}`
              }
            >
              {i + 1}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-name-${i}` }
            >
              {sale && (sale.products.filter((p) => {
                const matchProduct = p.id === product.productId;
                return matchProduct;
              }))[0].name}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-quantity${i}` }
            >
              { product.quantity }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price${i}`
              }
            >
              {(sale.products.filter((p) => {
                const matchProduct = p.id === product.productId;
                return matchProduct;
              }))[0].price.replace('.', ',')}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-${i}`
              }
            >
              {
                (product.quantity * (sale.products.filter((p) => {
                  const matchProduct = p.id === product.productId;
                  return matchProduct;
                }))[0].price).toFixed(2).toString().replace('.', ',')
              }
            </td>
          </tr>
        ))}
        <tr>
          <td
            colSpan="6"
            className="table-total-price"
            data-testid="customer_order_details__element-order-total-price"
          >
            {
              (sale && sale.sale && sale.sale.totalPrice
        && sale.sale.totalPrice) ? `Total: ${sale.sale.totalPrice
                  .replace('.', ',')}` : 'Total: 0,00'
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}

DetailsTable.propTypes = {
  sale: PropTypes.shape({
    salesProducts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    sale: PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetailsTable;
