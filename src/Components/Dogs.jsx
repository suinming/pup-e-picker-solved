import { DogCard } from "./DogCard";
export const Dogs = ({
  dogs,
  updateDogs,
  refetchDogs,
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
          updateDogs={updateDogs}
          refetchDogs={refetchDogs}
          dog={dog}
          key={dog.id}
        />
      ))}
    </>
  );
};
