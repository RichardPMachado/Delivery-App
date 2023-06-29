/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../services/request';

import '../styles/pages/Login.css';

import logoGaze from '../images/logoGaze.svg';
import photoLogin from '../images/photoLogin.png';
import lineBackground1 from '../images/lineBackground1.svg';

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
    <div className="login-page-container">
      <img
        className="login-line-background"
        alt="Detalhes amarelos do fundo da tela"
        src={ lineBackground1 }
      />
      <div className="login-content">
        <img
          alt="logo"
          src={ logoGaze }
        />

        <div className="title-and-description-login">
          <h3 className="title-login">Entrar</h3>
          <p>
            Entre e tenha acesso a uma variedade de cervejas artesanais e
            exclusivas que selecionamos para você
          </p>
        </div>

        <div className="inputs-container-login">
          <input
            data-testid="common_login__input-email"
            aria-label="Email"
            type="email"
            id="email"
            className="input"
            placeholder="Insira seu email"
            value={ email }
            onChange={ handleEmail }
          />
          <input
            data-testid="common_login__input-password"
            aria-label="Senha"
            type="password"
            id="password"
            className="input"
            placeholder="Insira sua senha"
            value={ password }
            onChange={ handlePassword }
          />
          <span className="forget-password">esqueceu sua senha?</span>
        </div>

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
          className="primary-button login-button"
          data-testid="common_login__button-login"
          type="button"
          onClick={ (event) => login(event) }
          disabled={ formeValidate() }
        >
          Entrar
        </button>

        <hr />

        <div className="login-create-account-content">
          <span className="dont-have-account">Não tem uma conta? </span>
          <button
            type="button"
            data-testid="common_login__button-register"
            className="create-account-link"
            onClick={ () => redirect('register') }
          >
            Crie uma conta gratuitamente
          </button>
        </div>
      </div>

      <img
        className="login-background-image"
        alt="Foto de umm copo de bebida"
        src={ photoLogin }
      />
    </div>
  );
}

export default Login;
