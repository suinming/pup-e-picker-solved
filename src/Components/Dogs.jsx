import { DogCard } from "./DogCard";
import { useState, useEffect } from "react";

export const Dogs = () => {
    // use json-server to get all the dogs
    const [dogs, setDogs] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/dogs")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDogs(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <>
            {dogs.map((dog) => (
                <DogCard dog={dog} key={dog.id} />
            ))}
        </>
    );
};
