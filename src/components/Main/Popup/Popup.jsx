import closeButton from "../../../../images/close.svg"

export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const {onClose, children } = props;
return (
<section className="popup">
        <div
        className ="popup__content" 
        >
  <div className="popup__form_content">
          <button
            aria-label="Close modal"
              className="popup__button-close"
              type="button"
              onClick={onClose}
            >
              <img
                className="popup__button-close-image"
                src={closeButton}
                alt="Cruz para cerrar"
              />
       </button>
       <fieldset className="popup__form-fieldset form__set">
              {children}
              </fieldset>
              </div>
        </div>
      </section>
  );
}