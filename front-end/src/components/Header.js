import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import logoGaze from '../images/logoGaze.svg';
import cartIcon from '../images/cartIcon.svg';

import '../styles/components/Header.css';

const ROUTE = 'customer_products';
const ELEMENT = 'element-navbar';

function Header({ cartQuantity, isProductPage, goToCheckoutPage }) {
  const history = useHistory();

  const { name } = JSON.parse(localStorage.getItem('user')) || { name: 'Usuário' };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <header>
      <div className="header-content">
        <img
          className="logo-gaze"
          alt="logo empresa Gaze"
          src={ logoGaze }
        />
        <nav className="header-nav">
          <span
            className="header-username"
            data-testid={ `${ROUTE}__${ELEMENT}-user-full-name` }
          >
            {`Olá, ${name}`}
          </span>
          <Link
            className="header-link-nav"
            data-testid={ `${ROUTE}__${ELEMENT}-link-products` }
            to="/customer/products"
          >
            Produtos
          </Link>
          <Link
            className="header-link-nav"
            data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }
            to="/customer/orders"
          >
            Meus Pedidos
          </Link>
        </nav>

        <div className="header-right-side-content">
          <button
            className="secundary-button header-loggout-button"
            type="button"
            data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }
            onClick={ logout }
          >
            <span>Sair</span>
          </button>
          {
            isProductPage && (
              <button
                type="button"
                className="header-cart-icon"
                onClick={ goToCheckoutPage }
              >
                <img
                  alt="ícone carrinho de compras"
                  src={ cartIcon }
                />
                <div
                  className="header-cart-badge"
                >
                  { cartQuantity }
                </div>
              </button>
            )
          }
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  cartQuantity: PropTypes.number,
  isProductPage: PropTypes.bool.isRequired,
  goToCheckoutPage: PropTypes.func,
};

Header.defaultProps = {
  cartQuantity: false,
  goToCheckoutPage: () => {},
};

export default Header;
