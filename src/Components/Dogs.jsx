import { DogCard } from "./DogCard";
// input a props called action to filter the desired dog type
//  all, isfavorite
export const Dogs = ({ dogs, setCountFromChild, dogShowType }) => {
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
                    dog={dog}
                    key={dog.id}
                />
            ))}
        </>
    );
};
