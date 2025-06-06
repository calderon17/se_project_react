import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import {
  getItems,
  handleDeleteCard,
  addItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { register, login, checkToken, getToken } from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    // isDay: False,
  });

  // const is weatherloaded
  // ^ extra work to have loadded text when refreshing
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState(""); // Add this at the top with other states

  const navigate = useNavigate();

  const handleToggleswitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card); //not defined
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = (name, imageUrl, weather) => {
    const token = getToken();
    return addItem(name, imageUrl, weather, token)
      .then((newItem) => {
        if (newItem) {
          // Only update state if we got a valid response
          setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        }
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteClick = (id) => {
    const token = localStorage.getItem("jwt"); // Get the token
    handleDeleteCard(id, token) // Use 'id' as that's what the API function expects
      .then(() => {
        setClothingItems((cards) => cards.filter((card) => card._id !== id));
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleRegister = ({ email, password, name, avatar }) => {
    return register({ email, password, name, avatar })
      .then((res) => {
        // After successful registration, log the user in
        return login({ email, password });
      })
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          return checkToken(data.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    return login({ email, password })
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          return checkToken(data.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        setLoginError("Incorrect email or password");
        throw new Error("Incorrect email or password");
      })
      .finally(() => setIsLoading(false));
  };

  const handleSwitchModal = () => {
    if (activeModal === "register") {
      setActiveModal("login");
    } else if (activeModal === "login") {
      setActiveModal("register");
    }
  };

  // this is the last message

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        // data.weather[0].main = "Clear";

        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        // Filter out any items without valid IDs
        const validItems = data.filter((item) => item && (item.id || item._id));
        setClothingItems(validItems);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  // esc key
  useEffect(() => {
    if (!activeModal) return; // stop if no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // dependency array with activeModal

  const handleLikeClick = ({ id, isLiked }) => {
    const token = getToken();
    // Check if this card is not currently liked
    return !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleUpdate = (userData) => {
    setCurrentUser(userData);
  };

  const handleSignOut = () => {
    // Remove token from localStorage
    localStorage.removeItem("jwt");

    // Update logged in status
    setIsLoggedIn(false);

    // Optional: Clear current user data
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleswitchChange }}
    >
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          isLoggedIn,
          setIsLoggedIn,
          isLoading,
          handleUpdate,
        }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              setActiveModal={setActiveModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleLikeClick={handleLikeClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleSignOut={handleSignOut}
                      onCardLike={handleLikeClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            onDelete={handleDeleteClick}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onSwitchModal={handleSwitchModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSwitchModal={handleSwitchModal}
            errorMessage={loginError}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
