function InfoTooltip(props) {
    return (
      <section  className={`popup ${props.isOpen && 'popup_opened'}`}> 
        <div className="info-popup__container">
          <div className={`info-popup__icon ${props.status? 'info-popup__icon_confirmed' : 'info-popup__icon_rejected'}`} />
          <p className="info-popup__text">{props.status? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
          <button
            className="popup__close-button"
            type="button"
            title="Закрыть"
            onClick={props.onClose}
          />
        </div>  
      </section> 
    );
  }

export default InfoTooltip;  