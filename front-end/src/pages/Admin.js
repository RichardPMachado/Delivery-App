/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { requestAdmRegister, setToken } from '../services/request';

function Admin() {
  const history = useHistory();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const { token } = JSON.parse(localStorage.getItem('user'));

  const [name, setName] = useState('');

  const [selectValue, setSelectValue] = useState('');

  const [failedTryRegister, setFailedTryRegister] = useState(false);

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const formValidation = () => {
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    const numberPasswordValidation = 6;
    const numberUserValidation = 12;
    return !!(!validEmail
      || password.length < numberPasswordValidation
      || name.length < numberUserValidation
      || selectValue === '');
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      setToken(token);
      await requestAdmRegister({ name, email, password, role: selectValue });
    } catch (error) {
      console.log(error);
      setFailedTryRegister(true);
    }
  };
  useEffect(() => {
    setFailedTryRegister(false);
  }, [name, email, password, selectValue]);

  const userLocalStorage = JSON.parse(localStorage.getItem('user'));

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect('seller/orders');
      if (userLocalStorage.role === 'customer') redirect('customer/products');
      if (userLocalStorage.role === 'administrator') redirect('admin/manage');
    }
    if (userLocalStorage === null) {
      redirect('login');
    }
  }, []);

  const ROUTE = 'customer_products';
  const ELEMENT = 'element-navbar';
  return (
    <div>
      <nav>
        <Link
          data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }
          to="/admin/manage"
        >
          Gerenciar Usuarios
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
      {
        (failedTryRegister)
          ? (
            <p data-testid="admin_manage__element-invalid-register">
              O endereço de e-mail já possui cadastro.
            </p>
          )
          : null
      }
      <section>
        <label htmlFor="name">
          Name
          <input
            data-testid="admin_manage__input-name"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ handleName }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ handleEmail }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ handlePassword }
          />
        </label>
        <label htmlFor="role">
          Role
          <select
            id="role"
            type="input"
            data-testid="admin_manage__select-role"
            value={ selectValue }
            onChange={ (e) => setSelectValue(e.target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Consumidor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
      </section>
      <button
        onClick={ (event) => register(event) }
        disabled={ formValidation() }
        type="button"
        data-testid="admin_manage__button-register"
      >
        Register
      </button>
    </div>
  );
}

export default Admin;
