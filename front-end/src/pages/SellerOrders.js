/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { requestSalesBySeller } from '../services/request';
import SaleContext from '../context/sale.context';

function SellerOrders() {
  const { setSaleId } = useContext(SaleContext);
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  const { id } = userLocalStorage;
  const [sales, setSales] = useState({ sales: [] });
  const getSales = async () => {
    const requestedSales = await requestSalesBySeller(id);
    setSales(requestedSales);
  };
  useEffect(() => {
    getSales();
  }, []);
  console.log(userLocalStorage);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  const formatDate = (date) => format((new Date(date)), 'dd/MM/yyy');

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect('seller/orders');
      if (userLocalStorage.role === 'customer') redirect('customer/orders');
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
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </Link>
        <span data-testid="customer_products__element-navbar-user-full-name">
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

      {sales.sales.map((sale, i) => (
        <Link
          key={ i }
          to={ `/seller/orders/${sale.id}` }
          onClick={ () => { setSaleId(sale.id); } }
        >
          <br />
          <br />
          <span data-testid={ `seller_orders__element-order-id-${sale.id}` }>
            Pedido
            <br />
            {sale.id}
          </span>
          <h2 data-testid={ `seller_orders__element-delivery-status-${sale.id}` }>
            {sale.status}
          </h2>
          <span data-testid={ `seller_orders__element-order-date${sale.id}` }>
            {formatDate(sale.saleDate)}
          </span>
          <br />
          <br />
          <span data-testid={ `seller_orders__element-card-price${sale.id}` }>
            {sale.totalPrice}
          </span>
          <br />
          <br />
          <span data-testid={ `seller_orders__element-card-address${sale.id}` }>
            {sale.deliveryAddress}
          </span>
          <br />
          <br />
        </Link>
      ))}
    </>
  );
}

export default SellerOrders;
