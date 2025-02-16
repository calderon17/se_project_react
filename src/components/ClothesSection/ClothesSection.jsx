import "./ClothesSection.css";

// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
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
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
