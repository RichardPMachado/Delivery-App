/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/request';
import replaceDotToComma from '../utils/replaceDotToComma';

function Products() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const userLocalStorage = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartValue', cartValue);

    history.push('/customer/checkout');
  };

  const getProducts = async () => {
    const requestedProducts = await requestProducts();
    setProducts(requestedProducts);
  };

  const updateCart = (product) => {
    if (product.quantity === 0) {
      const newCart = cart.filter((cartProduct) => cartProduct.id !== product.id);

      return setCart(newCart);
    }

    if (cart.some((cartProduct) => cartProduct.id === product.id)) {
      const newCart = cart.map((cartProduct) => {
        if (cartProduct.id === product.id) return product;

        return cartProduct;
      });

      return setCart(newCart);
    }

    const newCart = [...cart, product];

    setCart(newCart);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const newCartValue = cart.reduce((acc, { quantity, price }) => (
      acc + quantity * Number(price)
    ), 0);

    setCartValue(newCartValue);
  }, [cart]);

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect('seller/orders');
      if (userLocalStorage.role === 'customer') redirect('customer/products');
    }
    if (userLocalStorage === null) {
      redirect('login');
    }
  }, []);

  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  const BUTTON = 'button';
  const CHECKOUT_BOTTOM = 'checkout-bottom';

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
      <main>
        {
          products.map((product) => (
            <ProductCard
              key={ product.id }
              updateCart={ updateCart }
              product={ product }
            />
          ))
        }
        <button
          type="button"
          data-testid={ `${ROUTE}__${BUTTON}-cart` }
          onClick={ handleClick }
          disabled={ cart.length === 0 }
        >
          <span>Ver Carrinho</span>
          <span
            data-testid={ `${ROUTE}__${CHECKOUT_BOTTOM}-value` }
          >
            { replaceDotToComma(cartValue.toFixed(2)) }
          </span>
        </button>
      </main>
    </>
  );
}
export default Products;
