import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    
    setName(currentUser.name)
    setDescription(currentUser.about) 
    
  }, [currentUser, props.isOpen]);  

  const [ userName, setName ] = React.useState();
  const [ description, setDescription ] = React.useState();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: userName,
      about: description,
    })
  } 

  return ( 
    <PopupWithForm 
      name="profile"
      title="Редактировать профиль"
      children={
        <fieldset className="popup__fieldset">
          <input
            className="popup__input"
            type="text"
            id="name"
            name="name"
            required=""
            minLength={2}
            maxLength={40}
            onChange={handleNameChange}
            value={userName || ''}
          />
          <span className="popup__error name-error">
            Вы пропустили это поле.
          </span>
          <input
            className="popup__input"
            type="text"
            id="job"
            name="link"
            required=""
            minLength={2}
            maxLength={200}
            onChange={handleDescriptionChange}
            value={description || ''}
          />
          <span className="popup__error job-error">
            Вы пропустили это поле.
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

export default EditProfilePopup;