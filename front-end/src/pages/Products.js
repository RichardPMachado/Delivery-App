/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/request';
import replaceDotToComma from '../utils/replaceDotToComma';

import lineBackground3 from '../images/lineBackground3.svg';
import lineBackground4 from '../images/lineBackground4.svg';
import lineBackground5 from '../images/lineBackground5.svg';

import '../styles/pages/Products.css';
import Footer from '../components/Footer';

function Products() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  const userLocalStorage = JSON
    .parse(localStorage.getItem('user')) || { name: 'Usuário' };

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
  const BUTTON = 'button';
  const CHECKOUT_BOTTOM = 'checkout-bottom';

  return (
    <>
      <Header
        cartQuantity={ cart.length }
        isProductPage
        goToCheckoutPage={ handleClick }
      />

      <main className="main-product">
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
        <h2 className="page-product-title">
          Encontre cervejas de todos os estilos, sabores e aromas
        </h2>
        <div className="products-cards-container">
          {
            products.map((product) => (
              <ProductCard
                key={ product.id }
                updateCart={ updateCart }
                product={ product }
              />
            ))
          }
        </div>
        <button
          className="secundary-button cart-button"
          type="button"
          data-testid={ `${ROUTE}__${BUTTON}-cart` }
          onClick={ handleClick }
          disabled={ cart.length === 0 }
        >
          <span>Carrinho: </span>
          <span
            data-testid={ `${ROUTE}__${CHECKOUT_BOTTOM}-value` }
          >
            { `R$${replaceDotToComma(cartValue.toFixed(2))}` }
          </span>
        </button>
      </main>

      <Footer />
    </>
  );
}
export default Products;
