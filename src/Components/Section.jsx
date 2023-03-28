export const Section = ({ count, label, children, handleShow }) => {
    // const favoriteDogCount = 1;
    // const unfavoriteDogCount = 2;
    // input another prop call count = {favoriteDogCount: xx, unfavoriteDogCount:xx}
    return (
        <section>
            <div className="container-header">
                <div className="container-label">{label}</div>
                <div className="selectors">
                    {/* Add the class 'active' to any selector in order to make it's color change */}
                    {/* This should display the favorited count */}
                    <div
                        className={`selector active`}
                        onClick={() => handleShow("favorite")}
                    >
                        favorited ( {count.favoriteDogCount} )
                    </div>

                    {/* This should display the unfavorited count */}
                    <div
                        className={`selector`}
                        onClick={() => handleShow("unfavorite")}
                    >
                        unfavorited ( {count.unfavoriteDogCount} )
                    </div>
                    <div className={`selector`}>create dog</div>
                </div>
            </div>
            {children}
        </section>
    );
};
