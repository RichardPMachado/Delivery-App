/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { requestSalesByUser } from '../services/request';
import SaleContext from '../context/sale.context';
import Header from '../components/Header';

import lineBackground3 from '../images/lineBackground3.svg';
import lineBackground4 from '../images/lineBackground4.svg';
import lineBackground5 from '../images/lineBackground5.svg';

import '../styles/pages/Orders.css';
import Footer from '../components/Footer';

function Orders() {
  const { setSaleId } = useContext(SaleContext);
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  const { id } = userLocalStorage;
  const [sales, setSales] = useState({ sales: [] });
  const getSales = async () => {
    const requestedSales = await requestSalesByUser(id);
    setSales(requestedSales);
  };
  console.log(sales);
  useEffect(() => {
    getSales();
  }, []);
  const history = useHistory();

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  const formatDate = (date) => format((new Date(date)), 'dd/MM/yyy');
  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect('seller/orders');
      if (userLocalStorage.role === 'customer') redirect('customer/orders');
    }
    if (userLocalStorage === null) {
      redirect('/login');
    }
  }, []);
  return (
    <>
      <Header isProductPage={ false } />

      <main className="main-orders">
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
        <h2 className="page-yellow-title">Meus Pedidos</h2>
        <div className="sales-container">
          {sales.sales.map((sale, i) => (
            <Link
              className="sales-card-container"
              key={ i }
              to={ `/customer/orders/${sale.id}` }
              onClick={ () => { setSaleId(sale.id); } }
            >
              <div className="orders-page-order-number-container">
                <span className="orders-page-order-title">Pedido</span>
                <span
                  className="orders-page-order-number"
                  data-testid={ `customer_orders__element-order-id-${sale.id}` }
                >
                  {sale.id}
                </span>
              </div>
              <h2
                className="orders-page-order-status"
                data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
              >
                {sale.status}
              </h2>
              <div className="orders-page-order-date-price-container">
                <span
                  className="orders-page-order-date"
                  data-testid={ `customer_orders__element-order-date-${sale.id}` }
                >
                  { formatDate(sale.saleDate)}
                </span>
                <span
                  className="orders-page-order-price"
                  data-testid={ `customer_orders__element-card-price-${sale.id}` }
                >
                  {(sale.totalPrice).toString().replace('.', ',')}
                </span>
              </div>
            </Link>

          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Orders;
