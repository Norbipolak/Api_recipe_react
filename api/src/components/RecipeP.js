import { useParams } from "react-router-dom"
/*
fontos, hogy ez ott legyen 
*/

function RecipeP() {
    const [recipe, setRecipe] = useState([]);
    const {id} = useParams();
    console.log(id);
    // const params = useParams();
    // console.log(params.id);

/*
useParams()-val fogja nekünk leszedni a paramétereinket 
és most átmegyünk a az App.js-re 
ahol létrehozunk egy másik route-ot 
-> 
  return(
    <BrowserRouter>
        <Routes>
            <Route index element={<RecipesP/>}/>
            <Route path="/recipe/:id"/>
        </Routes>
    </BrowserRouter>
  );
}

Mi az :id a path-ban -> 
ez egy URL változó, aminek az értékét a useParams()-val fogjuk leszedni 
és ha emgcsináltuk ezt a path-ot az App.js-ben -> <Route path="/recipe/:id" element={<RecipeP/>}/>
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

és most a console.log(id)
pl. ha 4-es terméknél megyünk rá az external link-es ikonunkra 
aminél nagyon fontos, hogy a link következőképpen nézzen ki ->
    <Link to={"/recipes/ + r.id"}>
        <FontAwesomeIcon className="icon"
        icon="fa-solid fa-arrow-up-right-from-square" />
    </Link>
na és ha most rámegyünk a 4-dik terméknél az external link-re, akkor itt a console.log(id)
At id az lesz, hogy 4 a konzolon
azért, mert a path-ban itt van nekünk egy id-nk -> path="/recipe/:id
és egy úgy áll nekünk össze ez az id, hogy van egy nevesített aloldalunk, ami a /recipe lesz és van egy url változónk /4 (localhost:3000/recipe/4)
ennek az URL változónak az értéke bármi lehet, tehát ez azt mondja, hogy van egy recipe/:id, az URL változót az :id néven lehet elérni 
szóval ezt itt így lehet elérni, de ennek van egy másik szintaktikája is 
1. szintaktika 
    const {id} = useParams();
    console.log(id);
2. szintaktika 
    const params = useParams();
    console.log(params.id);

csak ha itt több URL változónk van -> <Route path="/recipe/:id/:title" element={<RecipeP/>}/>
pl. id és még a title is 
tehát megadunk valamit randomot title-nal pl. asdf
->
localhost:3000/recipe/4/asdf
és akkor, így van két URL változónk 

akkor ezt a következő módon tudjuk majd leszedni -> 
    const {id, title} = useParams();
    console.log(id, title); -> 4 asdf
    
    de most számnukra elég csak az id URL változónak 

    const {id} = useParams();
    console.log(id);

    szintaktikailag fontos, hogy az App.js-ben :id legyen (path="/recipe/:id") 

    és ha itt megvan az id-nk, akkor az id alapján pedig, le kell szedni JSON-val 
    igy lehet egy darab receptet leszedni az id alapján 
    'https://dummyjson.com/recipes/1'
    ne akkor most jön a return, hogy mit adunk vissza itt és csinálunk egy getRecipe függvényt
*/

const getRecipe = async ()=> {
    const response = await fetch("https://dummyjson.com/recipes/" + id);
    /*
    !!!! fontos, hogy itt ('https://dummyjson.com/recipes/1') az 1-est be kell helyetesíteni arra, hogy id ->
    ("https://dummyjson.com/recipes/" + id)!!!
    */
    const json = await response.json();
    console.log(json);
    //és akkor itt setteljük a setRecipes-t a json-re
    setRecipe(json);
    /*
    valamelyikre rákattintunk, modjunk a 6-dik ételre (localhost:3000/recipe/6), akkor annak fognak megjelenni a dolgai console.log(json) ->
    {id: 6, name: 'Quinoa Salad with Avocasdo, igredients: Array(8) stb.'}
        caloriesPerServing: 280
        cookTimeMInutes: 15
        cuisine: "Mediterranean"
        difficulty: "Easy"
        id: 6 
        image: "hosszu, nem irom ki"
        ingredients: (8)['Quonia', 'Avocado', 'Cherry Tomatoes']
        instructions (4) ['vvfvfdb', 'fvfdvefv', 'fvdbvx', 'sdgerdfg']
        rating: 4.4
        servings: 4 
        ....
        [[Prototype]]: Object

    és akkor ezt kell nekünk majd valahogy megjelenítenünk ->
    return(
    <div className="container">
        <div className="recipe-page-grid">

        </div>
    </div>
    most formázzuk a recipe-page-grid-et és majd ebben fogjuk megjeleníteni a dolgoakt, amiket szeretnénk (image, rating, cuisine stb.)
    de ugye ezt ezt beletettük a kétosztható recipe-page-grid-be és csinálunk még két div-et className="box"-val
    -> 
    <div className="container">
        <div className="recipe-page-grid">
            <div className="box">

            </div>
            <div className="box">
                
            </div>
        </div>
    </div>
az első box-ban megjelenítjük a images-t ->
    <div className="box">
        <div className="recipe-page-img">
            <img src={recipe.image}/>
        </div>
    </div>
!!!!!!!!!!ugye fontos, hogy ezt meg tudjuk tenni létre kell hozni egy const [recipe, setRecipe] = useState([]);
és ezt settelni kell a json válaszunkra!!!!!!!!!! setRecipe(json)
és így tudjuk megjeleníteni a recipe.image-vel -> <img src={recipe.image}/>

formázzuk a className="recipe-page-img" div-et amiben beleraktuk ezt az img-t src...-t
folytatás következő órán 
Az a lényeg, hogy most a főoldalról ét tudunk menni ha rákattintunk az external link-re annak az ételnek az oldalára, amit itt csinálunk
tehát erről azoldalról localhost:3000 -> ide localhost:3000/recipe/5 vagy bárhova az id alapján  
*/
};

/*
és itt is ugyanazzal a useEffect-es módszerrel, mint a RecipesP.js-ben hívjuk meg a getRecipe függvényt 
*/
useEffect(()=> {
    getRecipe();
}, []);

return(
    <div className="container">
        <div className="recipe-page-grid">
            <div className="box">
                <div className="recipe-page-img">
                    <img src={recipe.image}/>
                </div>
            </div>
            <div className="box">
                
            </div>
        </div>
    </div>
);
}



export default RecipeP;