import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestUsers, requestNewSale, setToken } from '../services/request';

/* const jwt = require('jsonwebtoken'); */

function Checkout() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const cartValue = localStorage.getItem('cartValue');
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { email } = JSON.parse(localStorage.getItem('user'));

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
      const teste = cart.map((p) => {
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
          teste },
      );
      history.push(`/customer/orders/${order.id}`);
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, i) => (
            <tr key={ product.id }>
              <td
                id={ product.id }
                data-testid={
                  `customer_checkout__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                id={ product.id }
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {product.name}
              </td>
              <td
                id={ product.id }
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                { product.quantity }
              </td>
              <td
                id={ product.id }
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {product.price.toString().replace('.', ',')}
              </td>
              <td
                id={ product.id }
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {
                  (product.quantity * product.price)
                    .toFixed(2).toString().replace('.', ',')
                }
              </td>
              <td>
                <button
                  type="button"
                  id={ product.id }
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  onClick={ (e) => {
                    let newCartValue = parseFloat(cartValue);
                    const newCart = cart.filter((p) => {
                      const status = p.id !== Number(e.target.id);
                      if (!status) newCartValue -= p.quantity * p.price;
                      return status;
                    });
                    localStorage.setItem(
                      'cartValue',
                      newCartValue.toFixed(2),
                    );
                    console.log(newCart);
                    localStorage.setItem(
                      'cart',
                      JSON.stringify(newCart),
                    );
                    setCart(newCart);
                  } }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div data-testid="customer_checkout__element-order-total-price">
        {
          parseFloat(cartValue).toFixed(2).toString().replace('.', ',')
        }

      </div>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ (event) => newSale(event) }
      >
        Finalizar Pedido
      </button>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
        value={ deliveryAddress }
        onChange={ handledeliveryAddress }
      />
      <input
        type="text"
        data-testid="customer_checkout__input-address-number"
        value={ deliveryNumber }
        onChange={ handledeliveryNumber }
      />
      <select
        data-testid="customer_checkout__select-seller"
        value={ selectValue }
        onChange={ (e) => setSelectValue(e.target.value) }
      >
        {users.users.map((user, i) => (
          <option key={ i } value={ user.id }>{user.name}</option>))}
      </select>
    </>
  );
}

export default Checkout;
