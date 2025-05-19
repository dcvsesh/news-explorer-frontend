import { useState, useRef, useEffect } from "react";

const Login = ({ handleLogin, onSwitchToSubscribe }) => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, validity, validationMessage } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validity.valid ? '' : validationMessage
    }));

    // Verifica el formulario completo
    const form = e.target.closest('form');
    setIsValid(form.checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleLogin(data.email, data.password);
    }
  };

  useEffect(() => {
    // Actualiza la validez global cuando cambian los datos
    const emailValid = emailRef.current?.validity.valid;
    const passwordValid = passwordRef.current?.validity.valid;
    setIsValid(emailValid && passwordValid);
  }, [data]);

  return (
    <div className="login">
      <h2 className="login_title">Iniciar sesión</h2>

      <form className="form login__form" noValidate onSubmit={handleSubmit}>
      <div className="input-group">
        <p className="login__form_inputs">Correo electrónico</p>
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
        <p className="login__form_inputs">Contraseña</p>
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
        <div className="login__buttons">
          <button
            type="submit"
            className={`login_button ${!isValid ? 'login_button_inactive' : ''}`}
            disabled={!isValid}
          >
            Iniciar sesión
          </button>

          <p className="login_subscribe_link">
            o{" "}
            <button
              type="button"
              className="subscribe_link"
              onClick={onSwitchToSubscribe}
            >
              inscribirse
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;