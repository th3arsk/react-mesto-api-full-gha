import React from 'react';
import Card from './Card.js';
import CurrentUserContext  from '../contexts/CurrentUserContext.js'

function Main(props) {
 
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
    <div className="content">
      <section className="profile">
        <div className="profile__avatar-container" 
           onClick={props.onEditAvatar}
        />
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }} 
        />
        <div className="profile__info">
          <h1 className="profile__name">
            {`${currentUser.name}`}
          </h1>
          <p className="profile__specialisation">
            {`${currentUser.about}`}
          </p>
          <button
            className="profile__edit-button"
            type="button"
            title="Редактировать профиль"
            onClick={props.onEditProfile}
          />
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить место"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card card={card} onCardClick={props.onImagePopup} key={card._id}
           onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </div>
  </main>
  )
}  

export default Main;