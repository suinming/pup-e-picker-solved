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
    useEffect(() => {
        fetch("http://localhost:3000/dogs")
            .then((response) => response.json())
            .then((data) => {
                setDogs(data);
                let INIT_favoriteDogCount = data.reduce(
                    (acc, cur) => (cur.isFavorite ? ++acc : acc),
                    0
                );
                let INIT_unfavoriteDogCount =
                    data.length - INIT_favoriteDogCount;
                setCount({
                    favoriteDogCount: INIT_favoriteDogCount,
                    unfavoriteDogCount: INIT_unfavoriteDogCount,
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
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
        setdogShowType(type);
    }

    return (
        count && (
            <div className="App">
                <header>
                    <h1>pup-e-picker</h1>
                </header>
                <Section count={count} handleShow={handleShow} label={"Dogs: "}>
                    <Dogs
                        dogs={dogs}
                        dogShowType={dogShowType}
                        setCountFromChild={setCountFromChild}
                        label={"All Dogs"}
                    />
                    {/* <CreateDogForm /> */}
                </Section>
            </div>
        )
    );
}

export default App;
