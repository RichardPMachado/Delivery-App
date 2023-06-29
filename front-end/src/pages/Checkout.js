/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { requestUsers, requestNewSale, setToken } from '../services/request';
import Header from '../components/Header';
import ProductTable from '../components/CheckoutTable';

import lineBackground3 from '../images/lineBackground3.svg';
import lineBackground4 from '../images/lineBackground4.svg';
import lineBackground5 from '../images/lineBackground5.svg';

import '../styles/pages/Checkout.css';
import Footer from '../components/Footer';

function Checkout() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const cartValue = localStorage.getItem('cartValue');
  const { email, token } = JSON.parse(localStorage.getItem('user'));
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));

  const [users, setUsers] = useState({ users: [] });
  const [deliveryAddress, setdeliveryAddress] = useState('');
  const [deliveryNumber, setdeliveryNumber] = useState('');
  const [selectValue, setSelectValue] = useState(1);

  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      const requestedUsers = await requestUsers();
      setUsers(requestedUsers);
    };
    getUsers();
  }, [setUsers]);

  const handledeliveryAddress = ({ target }) => {
    setdeliveryAddress(target.value);
  };

  const handledeliveryNumber = ({ target }) => {
    setdeliveryNumber(target.value);
  };

  const newSale = async (event) => {
    event.preventDefault();

    try {
      setToken(token);
      const products = cart.map((p) => {
        console.log(p);
        const productId = p.id;
        const productQuantity = p.quantity;
        return { productId, productQuantity };
      });
      const order = await requestNewSale(
        {
          email,
          sellerId: selectValue,
          totalPrice: parseFloat(cartValue).toFixed(2),
          deliveryAddress,
          deliveryNumber,
          products },
      );
      history.push(`/customer/orders/${order.id}`);
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  };
  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect('seller/orders');
      if (userLocalStorage.role === 'customer') redirect('customer/checkout');
    }
    if (userLocalStorage === null) {
      redirect('/login');
    }
  }, []);

  const renderAddressLabel = () => (
    <label
      className="address-label-container"
      htmlFor="address"
    >
      <span
        className="label-input-address"
      >
        Endereço
      </span>
      <input
        className="input"
        id="address"
        type="text"
        data-testid="customer_checkout__input-address"
        value={ deliveryAddress }
        placeholder="Insira o seu endereço"
        onChange={ handledeliveryAddress }
      />
    </label>
  );

  const renderAddressNumberLabel = () => (
    <label
      className="address-number-label-container"
      htmlFor="address-number"
    >
      <span
        className="label-input-address-number"
      >
        Número
      </span>
      <input
        id="address-number"
        className="input"
        type="text"
        data-testid="customer_checkout__input-address-number"
        value={ deliveryNumber }
        placeholder="Insira o número do seu endereço"
        onChange={ handledeliveryNumber }
      />
    </label>
  );

  return (
    <>
      <Header />

      <main className="main-checkout">
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
        <h2 className="page-yellow-title">Carrinho</h2>
        <ProductTable
          cart={ cart }
          onRemoveProduct={ setCart }
        />

        <h2 className="page-yellow-title">Detalhes sobre a entrega</h2>

        <div className="delivery-details-container">

          <label
            className="responsible-seller-container"
            htmlFor="responsible-seller"
          >
            <span
              className="label-input-responsible-seller"
            >
              Vendedor responsável
            </span>
            <select
              className="input select-responsible-seller"
              id="responsible-seller"
              type="input"
              data-testid="customer_checkout__select-seller"
              value={ selectValue }
              onChange={ (e) => setSelectValue(e.target.value) }
            >
              {
                users.users.map((user, i) => (
                  <option
                    key={ i }
                    value={ user.id }
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
          </label>
          <div className="address-content">
            { renderAddressLabel() }
            { renderAddressNumberLabel() }
          </div>
          <button
            className="primary-button finalize-order-button"
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (event) => newSale(event) }
          >
            Finalizar Pedido
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Checkout;
