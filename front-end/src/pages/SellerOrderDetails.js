/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { requestSaleById, attSale } from '../services/request';

function SellerOrdersDetails() {
  const { name } = JSON.parse(localStorage.getItem('user'));
  const path = window.location.pathname.split('/');
  const [sale, setSale] = useState({ sale: {} });
  const status = sale && sale.sale && sale.sale.status;
  const inTransity = 'Em Trânsito';
  const getSaleAndUser = async () => {
    const requestedSaleById = await requestSaleById(path[path.length - 1]);
    setSale(requestedSaleById);
  };
  const history = useHistory();
  const buttonPrepairValidate = (() => {
    if (status === 'Entregue'
    || status === inTransity || status === 'Preparando') { return true; }
  });

  const buttonTransityValidate = (() => {
    if (status === 'Entregue'
    || status === inTransity || status === 'Pendente') { return true; }
  });

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';

  const attSalePrepair = async (event) => {
    event.preventDefault();

    try {
      await attSale(path[path.length - 1], { status: 'Preparando' });
      console.log('teste');
    } catch (error) {
      console.log(error);
    }
  };
  const date = (sale && sale.sale && sale.sale.saleDate)
    ? format(new Date(sale.sale.saleDate), 'dd/MM/yyy') : null;

  const attSaleTransity = async (event) => {
    event.preventDefault();

    try {
      await attSale(path[path.length - 1], { status: 'Em Trânsito' });
      console.log('teste', path[path.length - 1]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSaleAndUser();
  }, [setSale]);

  return (
    <>
      <nav>
        <span data-testid="customer_products__element-navbar-link-orders">
          Pedidos
        </span>
        <span data-testid="customer_products__element-navbar-user-full-name">
          { name }
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
            {path[path.length - 1]}
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
            {sale && sale.sale && sale.sale.status}
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
                {console.log(sale)}
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

export default SellerOrdersDetails;
