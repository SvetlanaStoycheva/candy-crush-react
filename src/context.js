import React, { useState, useContext } from 'react';
import {
  teslaColors,
  candyColors,
  catsColors,
  planetsColors,
  criptoColors,
  musicColors,
} from './utils';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currentSetImages, setCurrentSetImages] = useState(candyColors);

  const handleCurrentBtn = (e) => {
    // console.log(e.currentTarget.dataset.id);
    const btnText = e.currentTarget.dataset.id;
    if (btnText === 'candy') {
      setCurrentSetImages(candyColors);
    } else if (btnText === 'tesla') {
      setCurrentSetImages(teslaColors);
    } else if (btnText === 'cats') {
      setCurrentSetImages(catsColors);
    } else if (btnText === 'planets') {
      setCurrentSetImages(planetsColors);
    } else if (btnText === 'cripto') {
      setCurrentSetImages(criptoColors);
    } else if (btnText === 'music') {
      setCurrentSetImages(musicColors);
    }
  };

  return (
    <AppContext.Provider value={{ handleCurrentBtn, currentSetImages }}>
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
// import { useGlobalContext } from './context'
// const { openSidebar, openModal } = useGlobalContext();
