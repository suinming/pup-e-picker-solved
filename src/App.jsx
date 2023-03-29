import { useEffect, useState } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const [dogs, setDogs] = useState([]);
    const [count, setCount] = useState({});
    const [dogShowType, setdogShowType] = useState("all");
    const [isAddDog, setIsAddDog] = useState(false);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/dogs");
                const dogs = await res.json();
                setDogs(dogs);
                const INIT_favoriteDogCount = dogs.reduce(
                    (acc, cur) => (cur.isFavorite ? ++acc : acc),
                    0
                );
                const INIT_unfavoriteDogCount =
                    dogs.length - INIT_favoriteDogCount;
                setCount({
                    favoriteDogCount: INIT_favoriteDogCount,
                    unfavoriteDogCount: INIT_unfavoriteDogCount,
                });
            } catch (error) {
                console.log(error);
                alert(
                    "something went wrong while fetching data. Please try again"
                );
            }
        };
        fetchDogs();
    }, []);

    function setCountFromChild(isFavorite, id) {
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
                break;
        }
    }
    return (
        <div className="App">
            <header>
                <h1>pup-e-picker</h1>
            </header>
            {isAddDog ? (
                <CreateDogForm handleShow={handleShow} />
            ) : (
                <Section count={count} handleShow={handleShow} label={"Dogs: "}>
                    <Dogs
                        dogs={dogs}
                        dogShowType={dogShowType}
                        setCountFromChild={setCountFromChild}
                        label={"All Dogs"}
                    />
                </Section>
            )}
        </div>
    );
}

export default App;
