import { useState } from "react";
import { dogPictures } from "../assets/dog-pictures";
import { postNewDog } from "../utils/utils.js";

export const CreateDogForm = ({
    handleShow,
    lastDogId,
    setIsUpdateDogsFromChild,
}) => {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [newDog, setNewDog] = useState({
        name: "",
        description: "",
    });
    return (
        <form
            action=""
            id="create-dog-form"
            onSubmit={(e) => {
                e.preventDefault();
                // post request
                postNewDog(newDog, selectedImage, lastDogId);
                handleShow("addDog");
                setIsUpdateDogsFromChild();
            }}
        >
            <h4>Create a New Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input
                type="text"
                value={newDog.name}
                onChange={(e) => {
                    setNewDog({
                        ...newDog,
                        name: e.target.value,
                    });
                }}
            />
            <label htmlFor="description">Dog Description</label>
            <textarea
                name=""
                id=""
                cols="80"
                rows="10"
                value={newDog.description}
                onChange={(e) => {
                    setNewDog({
                        ...newDog,
                        description: e.target.value,
                    });
                }}
            ></textarea>
            <label htmlFor="picture">Select an Image</label>
            <select
                id=""
                onChange={(e) => {
                    setSelectedImage(e.target.value);
                }}
            >
                {Object.entries(dogPictures).map(([label, pictureValue]) => {
                    return (
                        <option key={label} value={pictureValue}>
                            {label}
                        </option>
                    );
                })}
            </select>
            <input type="submit" value="submit" />
        </form>
    );
};
