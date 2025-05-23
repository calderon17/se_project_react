import "./ClothesSection.css";

// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // const userItems = clothingItems.filter(
  //   (item) => item.owner === currentUser._id
  // );

  return (
    <div className="clothes-section">
      <div className="clothes-section__menu">
        <p className="clothes-section__text">Your Items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__button"
          type="button"
        >
          + Add New Items
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
