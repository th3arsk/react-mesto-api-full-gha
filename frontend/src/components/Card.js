import React from 'react';
import CurrentUserContext  from '../contexts/CurrentUserContext.js';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  } 

  function handleLikeDelete() {
    props.onCardDelete(props.card);
  } 

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `like-button ${isLiked && 'like-button_active'}` 
  );

  return (
    <div className="element">
      <img
        className="element__picture"
        src={`${props.card.link}`}
        onClick={handleClick}
        alt={`${props.card.name}`}/>
      <h2 className="element__name">{`${props.card.name}`}</h2>
      <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
      <p className="element__like-count">{`${props.card.likes.length}`}</p>
      {isOwn && <button className="delete-button" type="button" onClick={handleLikeDelete}/>} 
    </div>
  )
}  
  
export default Card;