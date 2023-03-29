import { useState } from "react";

export const Section = ({ count, label, children, handleShow }) => {
    const [isActive, setIsActive] = useState({
        favorite: false,
        unfavorite: false,
        addDog: false,
    });
    return (
        <section>
            <div className="container-header">
                <div className="container-label">{label}</div>
                <div className="selectors">
                    {/* Add the class 'active' to any selector in order to make it's color change */}
                    {/* This should display the favorited count */}
                    <div
                        className={`selector ${
                            isActive.favorite ? "active" : ""
                        }`}
                        onClick={() => {
                            handleShow("favorite");
                            setIsActive({
                                favorite: !isActive.favorite,
                                unfavorite: false,
                                addDog: false,
                            });
                        }}
                    >
                        favorited ( {count.favoriteDogCount} )
                    </div>

                    {/* This should display the unfavorited count */}
                    <div
                        className={`selector ${
                            isActive.unfavorite ? "active" : ""
                        }`}
                        onClick={() => {
                            handleShow("unfavorite");
                            setIsActive({
                                favorite: false,
                                unfavorite: !isActive.unfavorite,
                                addDog: false,
                            });
                        }}
                    >
                        unfavorited ( {count.unfavoriteDogCount} )
                    </div>
                    <div
                        className={`selector ${
                            isActive.addDog ? "active" : ""
                        }`}
                        onClick={() => {
                            handleShow("addDog");
                            setIsActive({
                                favorite: false,
                                unfavorite: false,
                                addDog: !isActive.addDog,
                            });
                        }}
                    >
                        create dog
                    </div>
                </div>
            </div>
            {children}
        </section>
    );
};
