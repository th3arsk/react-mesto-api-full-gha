import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup (props) {
  const avatarRef = React.useRef();
 
  React.useEffect(() => {
    avatarRef.current.value = ' ';
  }, [props.isOpen])

  function handleSubmit(e) {
      e.preventDefault();
      
      props.onUpdateAvatar(avatarRef.current.value)
    }  
    
  return (
    <PopupWithForm 
      name="avatar"
      title="Обновить аватар"
      children={
        <fieldset className="popup__fieldset">
          <input
            ref={avatarRef}
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            id="avatar-link"
            name="avatar"
            required="" 
          />
          <span className="popup__error avatar-link-error">
            Введите ссылку на изображение.
          </span>
        </fieldset>
        } 
        buttonText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
    />
  )
}

export default EditAvatarPopup;

