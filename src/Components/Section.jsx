import { useState } from "react";

export const Section = (
  { favoriteDogs, unFavoriteDogs, label, children, handleShow },
) => {
  const [isActive, setIsActive] = useState({
    favorite: false,
    unfavorite: false,
    addDog: false,
  });
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* Add the class 'active' to any selector in order to make it's color change */}
          {/* This should display the favorited count */}
          <div
            className={`selector ${isActive.favorite ? "active" : ""}`}
            onClick={() => {
              setIsActive({
                favorite: !isActive.favorite,
                unfavorite: false,
                addDog: false,
              });
              handleShow("favorite", !isActive.favorite);
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${isActive.unfavorite ? "active" : ""}`}
            onClick={() => {
              setIsActive({
                favorite: false,
                unfavorite: !isActive.unfavorite,
                addDog: false,
              });
              handleShow("unfavorite", !isActive.unfavorite);
            }}
          >
            unfavorited ( {unFavoriteDogs.length} )
          </div>
          <div
            className={`selector ${isActive.addDog ? "active" : ""}`}
            onClick={() => {
              setIsActive({
                favorite: false,
                unfavorite: false,
                addDog: !isActive.addDog,
              });
              handleShow("addDog", !isActive.addDog);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
