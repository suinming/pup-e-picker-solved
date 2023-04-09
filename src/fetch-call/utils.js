import { baseUrl, standardHeader } from "./standardHeader";
export async function getAllDogs() {
  return fetch(baseUrl, {
    header: standardHeader,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("something went wrong while fetching dog");
    }
    return res.json();
  });
}

export async function deleteDog(id) {
  return fetch(`${baseUrl}/${id}`, {
    headers: standardHeader,
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("something went wrong");
    }
  });
}

export async function postNewDog(
  newDogName,
  description,
  selectedImage,
  lastDogId,
) {
  const body = {
    name: newDogName,
    image: selectedImage,
    description: description,
    isFavorite: false,
    id: lastDogId + 1,
  };
  return fetch(baseUrl, {
    method: "POST",
    headers: standardHeader,
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("something went wrong while posting a new dog");
    }
  });
}

export async function patchDog(dog) {
  const body = {
    isFavorite: !dog.isFavorite,
  };
  fetch(`${baseUrl}/${dog.id}`, {
    method: "PATCH",
    headers: standardHeader,
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      console.log(res);
      throw new Error("something went wrong while patch a dog ");
    }
  });
}
