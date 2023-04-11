/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { requestSaleById, attSale } from '../services/request';

function SellerOrdersDetails({ match: { params: { id } } }) {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  /* const path = window.location.pathname.split('/'); */
  const [sale, setSale] = useState();

  const timeOut = 500;

  const status = sale && sale.sale && sale.sale.status;
  console.log(sale);

  const date = (sale && sale.sale && sale.sale.saleDate)
    ? format(new Date(sale.sale.saleDate), 'dd/MM/yyy') : null;

  const inTransity = 'Em Trânsito';
  const inPrepair = 'Preparando';
  const delivered = 'Entregue';
  const pending = 'Pendente';

  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';

  const buttonPrepairValidate = (() => {
    if (status === delivered
    || status === inTransity || status === inPrepair) { return true; }
  });

  const buttonTransityValidate = (() => {
    if (status === delivered
    || status === inTransity || status === pending) { return true; }
  });

  const getSaleAndUser = async () => {
    const requestedSaleById = await requestSaleById(id);
    setSale(requestedSaleById);
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const attSalePrepair = async (event) => {
    event.preventDefault();

    try {
      await attSale(id, { status: inPrepair });
    } catch (error) {
      console.log(error);
    }
  };

  const attSaleTransity = async (event) => {
    event.preventDefault();

    try {
      await attSale(id, { status: inTransity });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    getSaleAndUser();
  }, [/* sale */]);

  useEffect(() => {
    const interval = setInterval(async () => {
      getSaleAndUser();
    }, timeOut);

    return () => clearInterval(interval);
  }, []);

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
          to="/seller/orders"
          data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }
        >
          Pedidos
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
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            Pedido
            {id}
          </span>
          <br />
          <br />
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {!!date && date}
          </span>
          <br />
          <br />
          <span
            data-testid={ 'seller_order_details__element'
            + '-order-details-label-delivery-status' }
          >
            {status}
          </span>
        </section>
      </label>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        onClick={ (event) => attSalePrepair(event) }
        disabled={ buttonPrepairValidate() }
      >
        Preparar Pedido

      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        onClick={ (event) => attSaleTransity(event) }
        disabled={ buttonTransityValidate() }
      >
        Saiu Para Entrega

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
                  `seller_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${i}` }
              >
                {sale && (sale.products.filter((p) => {
                  const matchProduct = p.id === product.productId;
                  return matchProduct;
                }))[0].name}
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-quantity-${i}` }
              >
                { product.quantity }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${i}`
                }
              >
                {(sale.products.filter((p) => {
                  const matchProduct = p.id === product.productId;
                  return matchProduct;
                }))[0].price.replace('.', ',')}
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }
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
        data-testid="seller_order_details__element-order-total-price"
      >
        {(sale && sale.sale && sale.sale.totalPrice
        && sale.sale.totalPrice) ? sale.sale.totalPrice.replace('.', ',') : ''}

      </div>
    </>
  );
}
SellerOrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default SellerOrdersDetails;
