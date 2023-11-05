import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute';
import { signup, signin, checkToken } from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoPopupIsOpen, setInfoPopupOpen] = React.useState(false);
  const [infoPopupStatus, setInfoPopupStatus] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(' ');
  const [currentUser, setCurrentUser] = React.useState({ })
  const [ cards, setCards ] = React.useState([ ]);

  React.useEffect(() => {
    handleTokenCheck()
  }, )

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
  }, )

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
  }, )

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    isLiked ? 
      api.removeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err => console.log(`Ошибка.....: ${err}`))
    :
      api.like(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err => console.log(`Ошибка.....: ${err}`))
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newList = cards.filter((item) => (item !== card));
      setCards(newList)
    })
    .then(closeAllPopups())
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfileOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoPopupOpen(false);
  }

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ });
  const [loggedIn, setLoggedIn] = React.useState(false)

  function handleImagePopupClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  function handleUpdateUser ({name, about}) {
    api.postUserInfo({name, about})
    .then((res) => { 
      setCurrentUser(res) 
    })
    .then(
      closeAllPopups())
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function handleUpdateAvatar (avatar) {
    api.postUserAvatar(avatar)
    .then((res) => {setCurrentUser(res)})
    .then(closeAllPopups())
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function handleAddPlace(card) {
    api.postCard(card)
    .then((res) => {setCards([res, ...cards])})
    .then(closeAllPopups())
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  const navigate = useNavigate();

  function register(password, email) {
    signup(password, email)
    .then((res) => {
       if (res) {  
        navigate("/signin")
        setInfoPopupStatus(true)
        setInfoPopupOpen(true)
      } else {
        setInfoPopupStatus(false)
        setInfoPopupOpen(true)
      }
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      checkToken()
      .then((res) => {
        if (res) {
          navigate("/")
          setLoggedIn(true)
          setUserEmail(res.email);
        } else {
          navigate("/signin")
        }
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));;
    }
  }

  function login(password, email) {
    console.log(password, email)
    signin(password, email)
    .then(() => {
      navigate("/")
      setLoggedIn(true)
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function exit() {
    navigate('signin');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <>  
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute loggedIn={loggedIn} element={
              <>
                <Header text="Выйти" handleClick={exit} onEmail={userEmail}/>
                <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} 
                  onImagePopup={handleImagePopupClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />   
                <Footer />
              </>
            }/>
          }/> 
          <Route path="/signup" element={
            <>
              <Header text="Войти" handleClick={()=>{navigate("/signin")}}/>
              <Register onSubmit={register} />
            </>} 
          />
          <Route path="/signin" element={
            <>
              <Header text="Регистрация" handleClick={()=>{navigate("/signup")}}/>
              <Login onSubmit={login}/>
            </>} 
          />
        </Routes>
          <ImagePopup
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
            card={selectedCard}
          />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoPopupIsOpen} status={infoPopupStatus}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
          />
          
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
