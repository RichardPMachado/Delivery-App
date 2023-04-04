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
  const { name } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  const formatDate = (date) => format((new Date(date)), 'dd/MM/yyy');
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  console.log(sales);
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
