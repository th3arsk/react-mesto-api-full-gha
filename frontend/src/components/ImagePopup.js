function ImagePopup(props) {
  return (  
    <section className={`popup picture-popup ${props.isOpen && 'popup_opened'}`}>
      <div className="picture-popup__container">
        <img 
          className="picture-popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <p className="picture-popup__caption"></p>
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

export default ImagePopup;