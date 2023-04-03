import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  console.log(sales);
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
            {Date.parse(sale.saleDate)}
          </span>
          <span data-testid={ `seller_orders__element-card-price${sale.id}` }>
            {sale.totalPrice}
          </span>
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
