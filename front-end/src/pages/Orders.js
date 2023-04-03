import { Link, useHistory } from 'react-router-dom';

function Orders() {
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  const history = useHistory();
  const { name } = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  return (
    <div>
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
    </div>
  );
}

export default Orders;
