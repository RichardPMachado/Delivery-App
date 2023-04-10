/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { requestSales } from '../services/request';
import SaleContext from '../context/sale.context';

function SellerOrders() {
  const { setSaleId } = useContext(SaleContext);
  const [sales, setSales] = useState({ sales: [] });
  const getSales = async () => {
    const requestedSales = await requestSales();
    setSales(requestedSales);
  };
  useEffect(() => {
    getSales();
  }, []);
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  console.log(userLocalStorage);
  const history = useHistory();

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };
  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  const formatDate = (date) => format((new Date(date)), 'dd/MM/yyy');
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
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
      {sales.sales.map((sale, i) => (
        <Link
          key={ i }
          to={ `/customer/orders/${sale.id}` }
          onClick={ () => { setSaleId(sale.id); } }
        >
          <br />
          <br />
          <span data-testid={ `customer_orders__element-order-id-${sale.id}` }>
            Pedido
            <br />
            {sale.id}
          </span>
          <h2 data-testid={ `customer_orders__element-delivery-status-${sale.id}` }>
            {sale.status}
          </h2>
          <span data-testid={ `customer_orders__element-order-date-${sale.id}` }>
            { formatDate(sale.saleDate)}
          </span>
          <br />
          <br />
          <span data-testid={ `customer_orders__element-card-price-${sale.id}` }>
            {(sale.totalPrice).toString().replace('.', ',')}
          </span>
          <br />
          <br />
        </Link>
      ))}
    </>
  );
}

export default SellerOrders;
