import Home from "./home/Home";
import Detaile from "./home/Detaile";
import { Routes, Route } from "react-router-dom";
import {anneSelection} from "./context/Anne";
import {session} from "./home/archive/bacsession";
import {Bac} from "./home/archive/bac";
import {Bac2} from "./home/archive/bac2";
import {Bepc} from "./home/archive/Bepc-2026";
import {useState} from "react";
function App() {
  const test = [...session].sort((a, b) => {
        return  b.Moy_Bac - a.Moy_Bac
  });
  const [filters , setFilters] = useState(test)
  function modifie(anneChnage){
    console.log(anneChnage)
    switch(anneChnage)
    {
    case "2025":{
    const anne  = [...Bac].sort((a, b) => {
            return  b.Moy_Bac - a.Moy_Bac
      });
    setFilters(anne)
      break;
    }
    
    case "2024":{
    const anne = [...Bac2].sort((a, b) => {
            return  b.Moy_Bac - a.Moy_Bac
      });
       setFilters(anne)
     
      break;
    }
    case "Brever2026":{
    const anne = [...Bepc].sort((a, b) => {
            return  b.Moy_Bac - a.Moy_Bac
      });
       setFilters(anne)
  
      break;
    }
    }
  }
  return (
    <>
   <anneSelection.Provider value={{filters , modifie}}>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Detail/:idEtudient" element={ <Detaile />} />
      <Route path="*" element={ <Detaile />} />
     </Routes>
   </anneSelection.Provider>


    </>
  )
}

export default App
