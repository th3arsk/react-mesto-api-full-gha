function PopupWithForm(props) {
    return (
      <section  className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}> 
        <form name={props.name} className="popup__form" noValidate="" onSubmit={props.onSubmit}>
          <p className="popup__heading">{props.title}</p>
          <>{props.children}</>
          <button
            className="popup__button"
            type="submit"
            disabled=""
          >
            {props.buttonText}
          </button>
          <button
            className="popup__close-button"
            type="button"
            title="Закрыть"
            onClick={props.onClose}
          />
          </form>
      </section> 
    );
  }

export default PopupWithForm;  

