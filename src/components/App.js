import api from "../utils/api";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function App() {

  const [cards, setCards] = useState([])


  function handleCardDelete(card) {
    const cardId = card._id;
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId))
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => {
        console.log(err)
      });
  }

  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setSelectedCard({})
  }


  // получаем список карточек
  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const [isLoading, setIsLoading] = useState(false);

  function handleUpdateUser(data) {
    setIsLoading(true)
    api.setUserData(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true)
    api.updateAvatar({ avatar })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCard(data)
      .then(newCard => {
        setCards((cards) => [newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [selectedCard, setSelectedCard] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  // переменная для слежения за всеми состояниями попапов
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])




  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header />

        <Routes>

          <Route path={'/'} element={

            <Main onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
            />
          } />

          <Route path={'/sign-up'} element={<Register />} />

          <Route path={'/sign-in'} element={<Login />} />

          <Route path={'*'}/>

        </Routes>

        <Footer />

        <EditProfilePopup isLoading={isLoading}
                          onUpdateUser={handleUpdateUser}
                          isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups} />

        <AddPlacePopup isLoading={isLoading}
                       onAddPlace={handleAddPlaceSubmit}
                       isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups} />

        <PopupWithForm isOpen={''}
                       onClose={closeAllPopups}
                       name={'delete'}
                       title={'Вы уверены?'}
                       buttonText={'Сохранить'}>

          <input className="popup__save-button" type="submit" name="delete" value="Да" />

        </PopupWithForm>

        <EditAvatarPopup isLoading={isLoading}
                         onUpdateAvatar={handleUpdateAvatar}
                         isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups} />

        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}/>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
