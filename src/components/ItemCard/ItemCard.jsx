import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike(item);
  };

  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          type="button"
          onClick={handleLikeClick}
        />
      )}
    </li>
  );
}

export default ItemCard;
