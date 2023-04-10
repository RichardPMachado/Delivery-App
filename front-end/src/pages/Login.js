/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { requestLogin } from '../services/request';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loged, setLoged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const userLocalStorage = JSON.parse(localStorage.getItem('user'));

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const formeValidate = (() => {
    const minPassword = 6;
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    return !!(!validEmail
      || password.length < minPassword
      || password === ''
      || email === '');
  });
  const history = useHistory();

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const user = await requestLogin({ email, password });
      localStorage.setItem(
        'user',
        JSON.stringify(user),
      );
      setLoged(true);
    } catch (error) {
      setFailedTryLogin(true);
      console.log(error);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  useEffect(() => {
    if (userLocalStorage) {
      if (userLocalStorage.role === 'seller') redirect('seller/orders');
      if (userLocalStorage.role === 'customer') redirect('customer/products');
      if (userLocalStorage.role === 'administrator') redirect('admin/manage');
    }
  }, []);
  if (loged
    && userLocalStorage && userLocalStorage.role === 'seller') redirect('seller/orders');
  if (loged
    && userLocalStorage
    && userLocalStorage.role === 'customer') redirect('customer/products');
  if (loged
      && userLocalStorage
      && userLocalStorage.role === 'administrator') redirect('admin/manage');
  return (
    <div>
      <h1> Login </h1>
      <label htmlFor="email">
        Email
        <input
          data-testid="common_login__input-email"
          type="email"
          id="email"
          className="email"
          placeholder="email@email.com"
          value={ email }
          onChange={ handleEmail }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          data-testid="common_login__input-password"
          type="password"
          id="password"
          className="password"
          placeholder="password"
          value={ password }
          onChange={ handlePassword }
        />
      </label>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              Senha ou e-mail não encontrado.
            </p>
          )
          : null
      }
      <button
        data-testid="common_login__button-login"
        type="button"
        onClick={ (event) => login(event) }
        disabled={ formeValidate() }
      >
        Login
      </button>

      <button
        data-testid="common_login__button-register"
        type="button"
      >
        <Link to="/register">
          Cadastrar
        </Link>
      </button>
    </div>
  );
}

export default Login;
