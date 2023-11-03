import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onSubmit(password, email)
  } 

  return (
    <section  className="register"> 
      <form name="register" className="register__form" noValidate="" onSubmit={handleSubmit}>
        <p className="register__header">Регистрация</p>
        <fieldset className="register__fieldset">
          <input
            className="register__input"
            type="email"
            id="email"
            name="email"
            required=""
            minLength={2}
            maxLength={40}
            placeholder="Email"
            onChange={handleEmailChange}
            value={email || ''}
          />
          <input
            className="register__input"
            type="password"
            id="password"
            name="password"
            required=""
            minLength={2}
            maxLength={20}
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password || ''}
          />
        </fieldset>
        <button
          className="register__button"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="register__caption">Уже зарегистрированы? <Link to="/sign-in" className="register__span">Войти</Link></p>
      </form>
    </section> 
  );
}

export default Register;  
