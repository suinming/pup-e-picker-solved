import { useEffect, useState } from "react";
import "./App.css";
import "./fonts/RubikBubbles-Regular.ttf";
import { CreateDogForm, Dogs, Section } from "./Components";
import { getAllDogs, patchDog } from "./fetch-call/utils.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dogs, setDogs] = useState([]);
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unFavoriteDogs = dogs.filter((dog) => !dog.isFavorite);
  const [dogShowType, setDogShowType] = useState("all");
  const isAddDog = dogShowType === "addDog";

  async function refetchDogs() {
    return getAllDogs().then((res) => setDogs(res)).catch((error) =>
      toast.error(error.message)
    );
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
            setDogShowType = {setDogShowType}
            refetchDogs={refetchDogs}
            lastDogId={dogs[dogs.length - 1].id}
          />
        )
        : (
          <Section
            favoriteDogs={favoriteDogs}
            unFavoriteDogs={unFavoriteDogs}
            setDogShowType = {setDogShowType}
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
