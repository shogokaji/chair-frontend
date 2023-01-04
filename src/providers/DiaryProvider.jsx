import { useState } from "react";
import { createContext } from "react";

export const DiaryContext = createContext();

export const DiaryProvider = (props) => {
 const { children } = props;
 const [myDiaries, setMyDiaries] = useState([]);

 return (
  <DiaryContext.Provider
   value={{
    myDiaries,
    setMyDiaries,
   }}
  >
   {children}
  </DiaryContext.Provider>
 );
}
