import { useState } from "react";
import { dogPictures } from "../assets/dog-pictures";
import { postNewDog } from "../fetch-call/utils.js";
import { toast } from "react-toastify";

export const CreateDogForm = ({
  setDogShowType,
  lastDogId,
  refetchDogs,
}) => {
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [newDogName, setNewDogName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postNewDog(newDogName, description, selectedImage, lastDogId).then(
          () => {
            setDogShowType("all");
            toast.success("post a new dog");
          },
        ).then(() => refetchDogs());
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={newDogName}
        onChange={(e) => {
          setNewDogName(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols="80"
        rows="10"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      >
      </textarea>
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
