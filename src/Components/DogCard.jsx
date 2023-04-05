import { deleteDog } from "../utils/utils.js";
import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";
export const DogCard = ({
  dog: { name, image, description, id, isFavorite },
  updateDogs,
  refetchDogs,
}) => {
  return (
    <div className="dog-card">
      {/* Choose which button to show depending on if dog is a favorite */}
      {isFavorite
        ? (
          <UnfavoriteButton
            onClick={() => {
              updateDogs(id);
            }}
          />
        )
        : (
          <FavoriteButton
            onClick={() => {
              updateDogs(id);
            }}
          />
        )}

      {/* Use this button to delete a puppy :(*/}
      <TrashButton
        onClick={() => {
          deleteDog(id).then(() => refetchDogs())
        }}
      />

      {/* Ignore this  */}
      {/* You can temporarily set a favorite overlay after a user favoritest a dog */}
      {/* Try making className "favorite-overlay active"*/}
      <div className="favorite-overlay ">{"<3"}</div>

      {/* Ignore this  */}
      {/* You can temporarily set a unfavorite overlay after a user favoritest a dog */}
      {/* Try making className "unfavorite-overlay active"*/}
      <div className="unfavorite-overlay">{"</3"}</div>

      {/* A Dogs Name */}
      <p className="dog-name">{name}</p>

      {/* A Dogs Image */}
      <img src={image} alt={name} />

      {/*  A Dogs description*/}
      <p className="dog-description">{description}</p>
    </div>
  );
};
