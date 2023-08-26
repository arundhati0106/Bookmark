import {useState, createContext, useContext} from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if(context === undefined) {
        throw new Error('Appcontext must be within appCpntextProvider!')
    }

    return context;
};

//component that return context provider
const AppContextProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    //pass the whole book will be sent as object 
    const addToFavourites = (book) => {
        const oldFavourites = [...favourites];
        
        const newFavourites = oldFavourites.concat(book);
        
        setFavourites(newFavourites);
    }

    const removeFromFavourites = (id) => {
        const oldFavourites = [...favourites];

        //if book's id is not equal to the id that is passed, filter it out
        const newFavourites = oldFavourites.filter((book) => book.id !== id);
        
        setFavourites(newFavourites);
    }

    return (
        <AppContext.Provider value={{favourites, addToFavourites, removeFromFavourites}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
