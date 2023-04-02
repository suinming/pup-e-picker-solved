import { toast } from "react-toastify";
export async function deleteDog(id) {
  return fetch(`http://localhost:3000/dogs/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      toast.error("something went wrong while deleting the dog");
      throw new Error("something went wrong");
    }
    toast.success("delete the dog");
  });
}

export async function postNewDog(newDog, selectedImage, lastDogId) {
  const body = {
    name: newDog.name,
    image: selectedImage,
    description: newDog.description,
    isFavorite: false,
    id: lastDogId + 1,
  };
  return fetch("http://localhost:3000/dogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      toast.error("something went wrong while posting a new dog");
      throw new Error("something went wrong while posting a new dog");
    }
    toast.success("post the dog");
  });
}

export async function patchDog(dog) {
  const body = {
    isFavorite: !dog.isFavorite,
  };
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      toast.error("something went wrong while patch a dog");
      throw new Error("something went wrong while patch a dog ");
    }
    toast.success("change the status of a dog");
  });
}
