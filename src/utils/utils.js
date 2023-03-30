export async function deleteDog(id) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const res = await fetch(`http://localhost:3000/dogs/${id}`, {
            headers: headers,
            method: "DELETE",
        });
        if (!res.ok) {
            alert(
                "something went wrong while delete the dog. Please try it again later"
            );
        } else {
            console.log(`delete a dog its ID is ${id}`);
        }
    } catch (error) {
        alert(
            "something went wrong while delete the dog. Please try it again later"
        );
        console.error(error);
    }
}

export async function postNewDog(newDog, selectedImage, lastDogId) {
    try {
        const body = {
            name: newDog.name,
            image: selectedImage,
            description: newDog.description,
            isFavorite: false,
            id: lastDogId + 1,
        };
        const headers = {
            "Content-Type": "application/json",
        };
        const res = await fetch("http://localhost:3000/dogs", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        if (res.ok) {
            const json = await res.json();
            console.log(json);
            alert("you create a new dog !!!");
        } else {
            alert(
                "something went wrong while adding new dog. Please try again"
            );
        }
    } catch (error) {
        console.log(error);
        alert("something went wrong while adding new dog. Please try again");
    }
}

export async function patchDog(dog) {
    try {
        const body = {
            isFavorite: !dog.isFavorite
        };
        const headers = {
            "Content-Type": "application/json",
        };
        const res = await fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(body),
        });
        if (res.ok) {
            const json = await res.json();
            console.log(json);
        } else {
            alert(
                "something went wrong while updating new dog. Please try again"
            );
        }
    } catch (error) {
        console.log(error);
        alert("something went wrong while updating new dog. Please try again");
    }
}
