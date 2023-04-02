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
  const [dogShowType, setdogShowType] = useState("all");
  const isAddDog = dogShowType === "addDog";
  const [isUpdateDogs, setIsUpdateDogs] = useState(false);

  function fetchDogs() {
    fetch("http://localhost:3000/dogs", {
      header: { "Content-Type": "application/json" },
    }).then((res) => {
      if (!res.ok) {
        toast.error("something went wrong while fetching all the dogs");
        throw new Error("something went wrong while fetching all the dogs");
      }
      return res.json();
    }).then((res) => setDogs(res));
  }

  useEffect(() => {
    fetchDogs();
  }, [isUpdateDogs]);

  function setIsUpdateDogsFromChild() {
    setIsUpdateDogs(!isUpdateDogs);
  }

  function updateDogsFromChild(id) {
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

  const handleShow = (type, state) => {
    setdogShowType(type);
    // if the state is true show the specific type of the dogs
    // if the state is false show all the dogs
    if (state) {
      setdogShowType(type);
    } else {
      setdogShowType("all");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      {isAddDog
        ? (
          <CreateDogForm
            handleShow={handleShow}
            setIsUpdateDogsFromChild={setIsUpdateDogsFromChild}
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
              updateDogsFromChild={updateDogsFromChild}
              setIsUpdateDogsFromChild={setIsUpdateDogsFromChild}
              label={"All Dogs"}
            />
          </Section>
        )}
      <ToastContainer />
    </div>
  );
}

export default App;
