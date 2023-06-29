/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { requestSaleById, attSale } from '../services/request';
import DetailsTable from '../components/DetailsTable';
import Header from '../components/Header';

import lineBackground3 from '../images/lineBackground3.svg';
import lineBackground4 from '../images/lineBackground4.svg';
import lineBackground5 from '../images/lineBackground5.svg';

import '../styles/pages/OrdersDetails.css';
import Footer from '../components/Footer';

const SELLER_NAME = 'order-details-label-seller-name';

const DATA_TEST_ID_SELLER_NAME = `customer_order_details__element-${SELLER_NAME}`;

function OrdersDetails({ match: { params: { id } } }) {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const [sale, setSale] = useState();

  const status = sale && sale.sale && sale.sale.status;

  const timeOut = 500;

  const date = (sale && sale.sale && sale.sale.saleDate)
    ? format(new Date(sale.sale.saleDate), 'dd/MM/yyy') : null;

  const inPrepair = 'Preparando';
  const delivered = 'Entregue';
  const pending = 'Pendente';
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
  }, []);

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

  const renderSellerName = () => (
    <div
      className="order-information-seller-name-container"
    >
      <span
        className="order-information-seller-name-title"
      >
        Vendedor:
      </span>
      <span
        className="order-information-seller-name"
        data-testid={ DATA_TEST_ID_SELLER_NAME }
      >
        {sale && sale.seller.name}
      </span>
    </div>
  );

  const renderOrderDate = () => (
    <div
      className="order-information-order-date-container"
    >
      <span
        className="order-information-order-date-title"
      >
        Vendedor:
      </span>
      <span
        className="order-information-order-date"
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {!!date && date}
      </span>
    </div>
  );

  return (
    <>
      <Header isProductPage={ false } />
      <main className="main-order-details">
        <img
          className="product-line-background-3"
          alt="Detalhes amarelos do fundo da tela"
          src={ lineBackground3 }
        />

        <img
          className="product-line-background-4"
          alt="Detalhes amarelos do fundo da tela"
          src={ lineBackground4 }
        />

        <img
          className="product-line-background-5"
          alt="Detalhes amarelos do fundo da tela"
          src={ lineBackground5 }
        />
        <h2 className="page-yellow-title">Detalhes do Pedido</h2>
        <div className="sale-information-container">
          <div className="order-information-container">
            <span
              className="order-information-order-id"
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${id}`}
            </span>
            { renderSellerName() }
            { renderOrderDate() }

          </div>

          <div className="order-details-status-container">
            <span
              className="order-details-status"
              data-testid={ data }
            >
              {status}
            </span>
            <button
              className="primary-button"
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ (event) => attSaleDelivered(event) }
              disabled={ buttonDeliveredValidate() }
            >
              Marcar Como Entregue
            </button>
          </div>
        </div>
        <DetailsTable sale={ sale } />
      </main>

      <Footer />
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
