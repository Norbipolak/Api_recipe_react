import './App.css';
import RecipesP from './components/RecipesP';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpRightFromSquare, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeC from './components/RecipeC';
import RecipeP from './components/RecipeP';

library.add(
  faCartShopping,
  faArrowUpRightFromSquare
);

/*
fontawesome-os dolgok 
-> 
kisbetűs library 
szóval fontos, hogy ez be legyen importálva 
import { library } from '@fortawesome/fontawesome-svg-core'; !!!!!!!!!!!!
és ha ez megvan utána kell a library.add(); ahova betesszük, ami kell nekünk -> 
akarunk egy cart-ot és egy external-linket
library.add(
    faCartShopping,
    faArrowUpRightFromSquare
);
*/

// function App() {
//   return (
//     <RecipesP/>
//   );
// }

function App() {
  return(
    <BrowserRouter>
        <Routes>
            <Route index element={<RecipesP/>}/>
            <Route path="/recipe/:id" element={<RecipeP/>}/>
        </Routes>
    </BrowserRouter>
  );
}

/*
Amikor elkészítettük ezt a browseRoute...dolgokat, akkor felül meg kell jellenie -> 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
ezért fontos, hogy beírjuk a terminálba a npm i react-router-dom előtte, még bármit is csinálnánk 
*/

export default App;
