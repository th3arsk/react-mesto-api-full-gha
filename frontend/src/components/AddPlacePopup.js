import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup (props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    const card = {
      name: nameRef.current.value,
      link: linkRef.current.value
    }
    
    props.onAddPlace(card)
  }  

  return (
    <PopupWithForm 
      name="place"
      title="Новое место"
      children={
        <fieldset className="popup__fieldset">
          <input
            ref={nameRef}
            className="popup__input"
            type="text"
            placeholder="Название"
            id="card-name"
            name="name"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span className="popup__error card-name-error">
            Вы пропустили это поле.
          </span>
          <input
            ref={linkRef}
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            id="image-link"
            name="link"
            required=""
          />
          <span className="popup__error image-link-error">
            Введите адрес сайта.
          </span>
        </fieldset>
      } 
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default AddPlacePopup;