/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { requestSaleById, attSale } from '../services/request';

function OrdersDetails({ match: { params: { id } } }) {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  /* const path = window.location.pathname.split('/'); */
  const [sale, setSale] = useState();

  const status = sale && sale.sale && sale.sale.status;

  const date = (sale && sale.sale && sale.sale.saleDate)
    ? format(new Date(sale.sale.saleDate), 'dd/MM/yyy') : null;

  const inPrepair = 'Preparando';
  const delivered = 'Entregue';
  const pending = 'Pendente';

  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  const data = 'customer_order_details__element-order-details-label-delivery-status';

  const buttonDeliveredValidate = (() => {
    if (status === delivered
        || status === pending || status === inPrepair) { return true; }
  });

  const getSaleAndUser = async () => {
    const requestedSaleById = await requestSaleById(id);
    setSale(requestedSaleById);
  };

  const attSaleDelivered = async (event) => {
    event.preventDefault();

    try {
      await attSale(id, { status: delivered });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    getSaleAndUser();
    try {
      await attSale(id, { status });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect(`seller/orders/${id}`);
      if (userLocalStorage.role === 'customer') redirect(`customer/orders/${id}`);
    }
    if (userLocalStorage === null) {
      redirect('login');
    }
  }, []);

  return (
    <>
      <nav>
        <Link
          data-testid={ `${ROUTE}__${ELEMENT}-link-products` }
          to="/customer/products"
        >
          Produtos
        </Link>
        <Link
          data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }
          to="/customer/orders"
        >
          Meus Pedidos
        </Link>
        <span data-testid={ `${ROUTE}__${ELEMENT}-user-full-name` }>
          { userLocalStorage && userLocalStorage.name }
        </span>
        <Link
          to="/login"
          data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }
          onClick={ logout }
        >
          Sair
        </Link>
      </nav>
      <br />
      <br />
      <label htmlFor="sale_information">
        <section id="sale_information">
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            Pedido
            {id}
          </span>
          <br />
          <br />
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {sale && sale.seller.name}
          </span>
          <br />
          <br />
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {!!date && date}
          </span>
          <br />
          <br />
          <span
            data-testid={ data }
          >
            {status}
          </span>
        </section>
      </label>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        onClick={ (event) => attSaleDelivered(event) }
        disabled={ buttonDeliveredValidate() }
      >
        Marcar Como Entregue

      </button>
      <table border="1">
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
        </tbody>
      </table>
      <div
        data-testid="customer_order_details__element-order-total-price"
      >
        {(sale && sale.sale && sale.sale.totalPrice
        && sale.sale.totalPrice) ? sale.sale.totalPrice.replace('.', ',') : ''}

      </div>
    </>
  );
}
OrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default OrdersDetails;
