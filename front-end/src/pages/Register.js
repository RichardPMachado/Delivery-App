import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestRegister } from '../services/request';

function Register() {
  const history = useHistory();

  const redirect = (pathName) => {
    history.push(`/${pathName}`);
  };

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [name, setName] = useState('');

  const [role, setRole] = useState('');

  const [isRegister, setIsRegister] = useState(false);

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

  const handleRole = ({ target }) => {
    setRole(target.value);
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
      await requestRegister({ name, email, password, role });

      setIsRegister(true);
    } catch (error) {
      setFailedTryRegister(true);
      setIsRegister(false);
    }
  };
  useEffect(() => {
    setFailedTryRegister(false);
  }, [email, password, name]);

  if (isRegister) return redirect('customer/products');
  if (failedTryRegister) return redirect('register');
  return (
    <div>
      <h2>Register</h2>
      <label htmlFor="name">
        Name
        <input
          data-testid="common_register__input-name"
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
          data-testid="common_register__input-email"
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
          data-testid="common_register__input-password"
          type="password"
          id="password"
          name="password"
          value={ password }
          onChange={ handlePassword }
        />
      </label>
      <label htmlFor="role">
        Role
        <input
          type="text"
          id="role"
          name="role"
          value={ role }
          onChange={ handleRole }
        />
      </label>

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
        data-testid="common_register__button-register"
      >
        Register
      </button>
    </div>
  );
}

export default Register;
