import { useEffect, useState } from "react";
import "./App.css";
import "./fonts/RubikBubbles-Regular.ttf";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { patchDog } from "./utils/utils.js";

function App() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const [dogs, setDogs] = useState([]);
    const [count, setCount] = useState({
        favoriteDogCount: null,
        unfavoriteDogCount: null,
    });
    const [dogShowType, setdogShowType] = useState("all");
    const [isAddDog, setIsAddDog] = useState(false);
    const [isUpdateDogs, setIsUpdateDogs] = useState(false);

    const fetchDogs = async () => {
        try {
            const res = await fetch("http://localhost:3000/dogs");
            const dogs = await res.json();
            setDogs(dogs);
            const INIT_favoriteDogCount = dogs.reduce(
                (acc, cur) => (cur.isFavorite ? ++acc : acc),
                0
            );
            const INIT_unfavoriteDogCount = dogs.length - INIT_favoriteDogCount;
            setCount({
                favoriteDogCount: INIT_favoriteDogCount,
                unfavoriteDogCount: INIT_unfavoriteDogCount,
            });
            console.log("execute the get all dogs request");
        } catch (error) {
            console.log(error);
            alert("something went wrong while fetching data. Please try again");
        }
    };

    useEffect(() => {
        fetchDogs();
    }, [isUpdateDogs]);

    function setIsUpdateDogsFromChild() {
        setIsUpdateDogs(!isUpdateDogs);
        console.log("toggle the isUpdateDogs switch");
    }

    // !! can do some code refinment at this function
    function setCountFromChild(isFavorite, id) {
        // update the dog isFavorite props by sending a patch request
        let targetDog = dogs.find((dog) => dog.id === id);
        patchDog(targetDog);
        // update the count state
        if (isFavorite) {
            setCount({
                favoriteDogCount: count.favoriteDogCount - 1,
                unfavoriteDogCount: count.unfavoriteDogCount + 1,
            });
        } else {
            setCount({
                favoriteDogCount: count.favoriteDogCount + 1,
                unfavoriteDogCount: count.unfavoriteDogCount - 1,
            });
        }
        let updateDogs = dogs.map((dog, idx) => {
            if (dog.id === id) {
                return { ...dog, isFavorite: !dog.isFavorite };
            } else {
                return dog;
            }
        });
        setDogs(updateDogs);
    }

    function handleShow(type) {
        switch (type) {
            case "favorite":
                setdogShowType("favorite");
                break;
            case "unfavorite":
                setdogShowType("unfavorite");
                break;
            case "addDog":
                setIsAddDog(!isAddDog);
                break;
            default:
                setdogShowType("all");
                break;
        }
    }
    return (
        <div className="App">
            <header>
                <h1>pup-e-picker</h1>
            </header>
            {isAddDog ? (
                <CreateDogForm
                    handleShow={handleShow}
                    setIsUpdateDogsFromChild={setIsUpdateDogsFromChild}
                    lastDogId={dogs[dogs.length - 1].id}
                />
            ) : (
                <Section count={count} handleShow={handleShow} label={"Dogs: "}>
                    <Dogs
                        dogs={dogs}
                        dogShowType={dogShowType}
                        setCountFromChild={setCountFromChild}
                        setIsUpdateDogsFromChild={setIsUpdateDogsFromChild}
                        label={"All Dogs"}
                    />
                </Section>
            )}
        </div>
    );
}

export default App;
