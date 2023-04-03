import { useHistory } from 'react-router-dom';

function SellerNavBar() {
  const history = useHistory();
  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <header>
        <nav>
          <span data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }>
            Pedidos
          </span>
          <span data-testid={ `${ROUTE}__${ELEMENT}-user-full-name` }>
            { name }
          </span>
          <button
            data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }
            type="button"
            onClick={ logout }
          >
            Sair
          </button>
        </nav>
      </header>
    </div>
  );
}

export default SellerNavBar;
