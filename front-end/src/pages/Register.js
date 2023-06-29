import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestRegister } from '../services/request';

import '../styles/pages/Register.css';

import lineBackground2 from '../images/lineBackground2.svg';
import logoGaze from '../images/logoGaze.svg';
import photoRegister from '../images/photoRegister.png';

function Register() {
  const history = useHistory();

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [name, setName] = useState('');

  const [userRole, setUserRole] = useState('false');

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
      || name.length < numberUserValidation);
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const user = await requestRegister({ name, email, password });
      localStorage.setItem(
        'user',
        JSON.stringify(user),
      );
      const userLocalStorage = localStorage.getItem('user');
      const userObject = JSON.parse(userLocalStorage);
      setUserRole(userObject.role);
    } catch (error) {
      setFailedTryRegister(true);
    }
  };
  useEffect(() => {
    setFailedTryRegister(false);
  }, [email, password, name]);

  if (userRole === 'customer') redirect('customer/products');
  if (userRole === 'seller') redirect('seller/orders');
  if (userRole === 'administrator') redirect('admin/manage');
  return (
    <div className="register-page-container">
      <img
        className="register-line-background"
        alt="Detalhes amarelos do fundo da tela"
        src={ lineBackground2 }
      />

      <div className="register-content">
        <img
          alt="logo"
          src={ logoGaze }
        />

        <div className="title-and-description-register">
          <h3 className="title-register">Cadastre-se</h3>
          <p>
            Com apenas alguns cliques, você poderá comprar suas cervejas
            favoritas e recebê-las diretamente na sua casa,
            em qualquer lugar do país
          </p>
        </div>

        <div className="register-input-container">
          <input
            data-testid="common_register__input-name"
            type="text"
            id="name"
            name="name"
            className="input"
            placeholder="Insira seu nome completo"
            value={ name }
            onChange={ handleName }
          />

          <input
            data-testid="common_register__input-email"
            type="text"
            id="email"
            name="email"
            className="input"
            placeholder="Insira seu email"
            value={ email }
            onChange={ handleEmail }
          />

          <input
            data-testid="common_register__input-password"
            type="password"
            id="password"
            name="password"
            placeholder="Insira sua senha"
            className="input"
            value={ password }
            onChange={ handlePassword }
          />
        </div>

        {
          (failedTryRegister)
            ? (
              <p data-testid="common_register__element-invalid_register">
                O endereço de e-mail ja possui cadastro.
              </p>
            )
            : null
        }
        <button
          onClick={ (event) => register(event) }
          disabled={ formValidation() }
          type="button"
          className="primary-button register-button"
          data-testid="common_register__button-register"
        >
          Criar conta
        </button>
      </div>

      <img
        className="register-background-image"
        alt="Foto da cerveja caindo no copo"
        src={ photoRegister }
      />

    </div>
  );
}

export default Register;
