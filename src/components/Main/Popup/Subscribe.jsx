import { useState, useRef, useEffect } from "react";

const Subscribe = ({ handleSubscribe, onSwitchToLogin }) => {
  const [data, setData] = useState({ email: '', password: '', username: '' });
  const [errors, setErrors] = useState({ email: '', password: '', username: '' });
  const [isValid, setIsValid] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, validity, validationMessage } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validity.valid ? '' : validationMessage
    }));

    const form = e.target.closest('form');
    setIsValid(form.checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSubscribe(data.email, data.password, data.username);
    }
  };

  useEffect(() => {
    const emailValid = emailRef.current?.validity.valid;
    const passwordValid = passwordRef.current?.validity.valid;
    const usernameValid = userRef.current?.validity.valid;
    setIsValid(emailValid && passwordValid && usernameValid);
  }, [data]);

  return (
    <div className="subscribe">
      <h2 className="subscribe_title">Crear cuenta</h2>

      <form className="form subscribe__form" noValidate onSubmit={handleSubmit}>

      <div className="input-group">
        <p className="subscribe__form_inputs">Correo electrónico</p>
        <input
          ref={emailRef}
          className={`input__text input__text_email ${errors.email && 'input__text_error'}`}
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          value={data.email}
          onChange={handleChange}
          required
        />
        <span className={`form__input-error email-input-error ${errors.email && 'form__input-error_active'}`}>
          {errors.email}
        </span>
</div>
<div className="input-group">
        <p className="subscribe__form_inputs">Contraseña</p>
        <input
          ref={passwordRef}
          className={`input__text input__text_password ${errors.password && 'input__text_error'}`}
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          value={data.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <span className={`form__input-error password-input-error ${errors.password && 'form__input-error_active'}`}>
          {errors.password}
        </span>
        </div>
        <div className="input-group">
        <p className="subscribe__form_inputs">Nombre de usuario</p>
        <input
          ref={userRef}
          className={`input__text input__text_username ${errors.username && 'input__text_error'}`}
          type="text"
          name="username"
          placeholder="Introduce tu nombre de usuario"
          value={data.username}
          onChange={handleChange}
          required
          minLength={3}
        />
        <span className={`form__input-error username-input-error ${errors.username && 'form__input-error_active'}`}>
          {errors.username}
        </span>
</div>
        <div className="subscribe__buttons">
          <button
            type="submit"
            className={`subscribe_button ${!isValid ? 'subscribe_button_inactive' : ''}`}
            disabled={!isValid}
          >
            Crear cuenta
          </button>

          <p className="subscibe_login_link">
            o{" "}
            <button
              type="button"
              className="login_link"
              onClick={onSwitchToLogin}
            >
              iniciar sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;