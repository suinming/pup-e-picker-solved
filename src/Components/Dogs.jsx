import { DogCard } from "./DogCard";
export const Dogs = ({
    dogs,
    setCountFromChild,
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
                    setCountFromChild={setCountFromChild}
                    setIsUpdateDogsFromChild={setIsUpdateDogsFromChild}
                    dog={dog}
                    key={dog.id}
                />
            ))}
        </>
    );
};
