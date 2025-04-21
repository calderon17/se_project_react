import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";
import likeButton from "..//..//images/likebutton.svg";
import likeButtonActive from "..//..//images/likebuttonactive.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            type="button"
            onClick={handleLikeClick}
          >
            <img
              src={isLiked ? likeButtonActive : likeButton}
              alt="like button"
              className="card__like-button-img"
            />
          </button>
        }
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
