import { useEffect, useState } from "react";
import "./App.css";
import "./fonts/RubikBubbles-Regular.ttf";
import { CreateDogForm, Dogs, Section } from "./Components";
import { patchDog } from "./utils/utils.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const [dogs, setDogs] = useState([]);
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unFavoriteDogs = dogs.filter((dog) => !dog.isFavorite);
  const [dogShowType, setDogShowType] = useState("all");
  const isAddDog = dogShowType === "addDog";

  function refetchDogs() {
    return fetch("http://localhost:3000/dogs", {
      header: { "Content-Type": "application/json" },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      return res.json();
    })
      .then((json) => setDogs(json))
      .catch((error) => {
        console.error(error);
        toast.error("something went wrong");
      });
  }

  function updateDogs(id) {
    const targetDog = dogs.find((dog) => dog.id === id);
    patchDog(targetDog);
    const updateDogs = dogs.map((dog) => {
      if (dog.id === id) {
        return { ...dog, isFavorite: !dog.isFavorite };
      } else {
        return dog;
      }
    });
    setDogs(updateDogs);
  }

  function handleShow(nextState) {
    setDogShowType(nextState);
  }

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      {isAddDog
        ? (
          <CreateDogForm
            handleShow={handleShow}
            refetchDogs={refetchDogs}
            lastDogId={dogs[dogs.length - 1].id}
          />
        )
        : (
          <Section
            favoriteDogs={favoriteDogs}
            unFavoriteDogs={unFavoriteDogs}
            handleShow={handleShow}
            label={"Dogs: "}
          >
            <Dogs
              dogs={dogs}
              dogShowType={dogShowType}
              updateDogs={updateDogs}
              refetchDogs={refetchDogs}
              label={"All Dogs"}
            />
          </Section>
        )}
      <ToastContainer />
    </div>
  );
}

export default App;
