import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <button
        data-testid="login_common__button"
        type="button"
        onClick={ () => {} }
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
