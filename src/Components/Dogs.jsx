import { DogCard } from "./DogCard";
export const Dogs = ({
  dogs,
  updateDogsFromChild,
  setIsUpdateDogsFromChild,
  dogShowType,
}) => {
  let displayDogs;
  switch (dogShowType) {
    case "favorite":
      displayDogs = dogs.filter((dog) => dog.isFavorite);
      break;
    case "unfavorite":
      displayDogs = dogs.filter((dog) => !dog.isFavorite);
      break;
    default:
      displayDogs = dogs;
      break;
  }
  return (
    <>
      {displayDogs.map((dog) => (
        <DogCard
          updateDogsFromChild={updateDogsFromChild}
          setIsUpdateDogsFromChild={setIsUpdateDogsFromChild}
          dog={dog}
          key={dog.id}
        />
      ))}
    </>
  );
};
