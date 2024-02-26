/*
Azért van P a végén, mert ez egy page lesz 
*/

import RecipeC from "./RecipeC";

function RecipesP() {
/*
Kell egy useState-s változó, ahol tárolni fogjuk majd a receptjeinket, ez egy tömb lesz
*/ 
    const [recipes, setRecipes] = useState([]);

    //egy async metódussal, pedig leszedjük a receptjeinket 
    const getRecipes = async ()=> {
        const response = await fetch("https://dummyjson.com/recipes");
        const json = await response.json() // azért, mert json-ban szeretnénk megkapni ezeket az értékeket 

        console.log(json); // megkaptuk a receptjeinket 

        //!!!!!!!!!a recipes useState-s változtót be kell majd állítani a json.recipes 
        setRecipes(json.recipes);
    };

    /*
    és, ha itt meghívnánk simán azt, hogy getRecipes() ezt az asnyc függvényt, miután setteltük -> setRecipes(json.recipes);
    akkor folyamatosan szedné le az adatokat és megelőzve készítünk egy useEffect-et, amiben meghívjuk a getRecipes()-t
    és ilyenkor egyszer (valójában kétszer) fogja megjeleníteni a komponens betöltésekor 
    */

    useEffect(()=> {
        setRecipes();
    }, []);

    /*
    Ha végigszeretnénk menni a recepteken és megjeleníteni őket, arra kell a map 
    előtte megcsináljuk a className="recipes-grid"-et, amiben lesz majd a map, fontos, hogy a mapnál legyen {}, tehát egy ilyenbe
    kell beletenni mindig ->
        {
            recipes.map((r, i)=> 
            <div key={i}>
                <h4>r{r.name}</h4>
            </div>
            )
        }
    az a lényeg itt, hogy ugy lesszetük az adatainkat és ott több dolog is van pl. name, rating, serving egy ilyen recipes: Array(30)-ben 
    ilyen formában az első elemnél 
    0: 
        difficulty: "Easy"
        cuisine: "Italian"
        id: 1
        name: "Classic Margherita Pizza"
        rating: 4.6 stb. 

    és mi itt ezek az adatok közül csak a name-t szeretnénk megjeleníteni egy h4-es tag-ben -> <h4>r{r.name}</h4>

    ha megjelenítettük ezeket az adatokat, akkor csinálunk egy className="recipe" -> 
        recipes.map((r, i)=> 
        <div key={i} className="recipe">
            <h4>r{r.name}</h4>
        </div>
        )
    és emiatt minden egyes elemet css-ben megformáztunk, tehát kapnak egy háttérszínt, egy bordert, padding-et és egy text-align: center-t

    majd ezen a div-en belül, ahol eddig csak a r.name van megjelítve, ott meg szeretnénk jeleníteni további adatokat is, amit tartalmaz ez 
    az array, amit visszakaptunk pl. az első ilyen a egy kép lesz az ételről -> 
        <div className="recipe-img">
            <img src={r.image}/>
        </div>
    Elöször csináltunk egy div-et, ami megkapta a className="recipe-img"-t, mert egy képet, mindig egy div-be kell belerakni formázás miatt, 
    hogy kapjon egy magasságot pl. 
    és utána ebbe div-be beletettük a képet, fontos itt!!!, hogy a <img/> csak lezáró tag-e van, nem ugy mint egy div ahol <div></div>
    és akkor a képet, mindig src-vel tudjuk belerakni, a formázása itt react-ben -> src={} és ide rakjuk bele az r.image, mert ott van 
    a kép, abban a tömbben, amit visszakaptunk(de mondjuk a termékeknál, amikor azokat csináltuk ott thumbnail volt nem image akkor r.thumbnnail)
    megjelentek a képek, amit most formázunk css-ben -> recipe-img-t 

    Ha megvan ez, akkor a kép alatt szeretnénk, gombokat, pl. a kosárba, meg mennyiséget is beállítani(az majd késöbb), 
    most egy external link ikon lesz 
    ehhez csinálunk egy className="recipe-controls", ami egy kétosztható grid lesz -> 
        <div className="recipe-controls">
            <div>

            </div>
            <div>
                                
            </div>
        </div>
        és akkor ide jön a kosárba, meg a mennyiség egy plusz minusz gombbal, amihez font awesome-ot fogunk használni 
        mielőtt fontawesome-os logo-kat használunk, fontos, hogy fe legyen telepítve(google-ba beírjuk, hogy font awesome react és ott az első)
        ezt kell bemásolni ide a terminálba -> 
        npm i --save @fortawesome/fontawesome-svg-core
        npm install --save @fortawesome/free-solid-svg-icons
        npm install --save @fortawesome/react-fontawesome

    és utána tudjuk majd leszedni a logo-kat, amiket akarunk, ha fel lett telepítve összeszedjük, hogy milyen ikonokra van szükségünk 
    az ikonokat, majd az App.js-ben tesszük be(most át kell megnézni, hogy hogyan lettek telepítve)

    Ha megcsináltunk minden-t, akkor ahova szeretnénk betenni az ikonunkat, oda csak kimásoljuk a fontAwesome oldalról, ami kell a react-hez
    ez így fog kinézni -> <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> !!!!!!!!!!!!!!!!!!!!!!!
        <div className="recipe-controls">
            <div>
                <FontAwesomeIcon className="icon"
                icon="fa-solid fa-arrow-up-right-from-square" />
            </div>
            <div>
                <FontAwesomeIcon className="icon"
                icon="fa-solid fa-cart-shopping" />
            </div>
    mindegyiknek, adtunk egy className="icon"-t a formázás miatt, de amugy megjelentek egymás mellett a két link, 
    ugy mert ezek benne vannak a className="recipe-controls" div-be, ami egy grid 1fr 1fr
    most formázzuk ezek a className="icon"-t css-ben

    Következő dolog, hogy vannak a szövegeink(ételneveink) és ezeknek is normálisan meg kell, hogy jelenjenek -> 
    ezt belerakjuk egy tárolóba, annak készítünk egy magasságot (most így néz ki <h4>{r.name}</h4>) ->
        <div className="title">
            <h4>{r.name}</h4>
        </div>
    beleraktuk egy div-be className="title" és ezt majd megformázzuk css-ben 
    ****************************************************************************************************************
    most el kellene készíteni, hogy külsó linken meg tudjuk nyitni, tehát ha rákattintunk az externak link-es ikonunk-ra 
    akkor átvigyen minket egy másik oldalra, ahol arról az ételről jelenítünk meg majd több dolgot(ami még van JSON-ben)
    pl. hozzávalók, elkészítési nehezség stb.

    !!!!!!!Ehhez mi szükséges, hogy több oldalt is tudjuk készíteni akár 
    browser-route-vel!!!!!!!!!!!!!
    ehhez be kell írni a terminálba, hogy npm i react-router-dom
    és ha ez megvan, akkor átmegyünk a App.js-be, ahol létrehoztunk 
    és akkor ehelyett, ami most van az App.js-ben 
    function App() {
        return (
            <RecipesP/>
        );
    }
    ahelyett kell ez !!!!!!!!!!!!!!!
    function App() {
        return(
            <BrowserRouter>
                <Routes>
                    <Route index element={<RecipesP/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
    most megjelenik ugyanaz, ami eddig volt, mintha csak simán beírtuk volna a return-be a <RecipesP/>, mint az első verzióban
    most nem csináltunk meg a teljes folyamatot, mert nincsen navigációs menünk 
    de most jó lenne hogyha ezt, ami itt csináltunk a recipes.map alatt azt egy új komponensben megoldanánk 
    !!!!! erre létrehozunk egy RecipeC.js-t 

    oda bemásoltuk ami itt volt a maps alatt a RecipeC return-jébe 
    div className="recipe">
        <div className="title">
            <h4>{r.name}</h4>
        </div>

        <div className="recipe-img">
            <img src={r.image}/>
        </div>

        <div className="recipe-controls">
            <div>
                <FontAwesomeIcon className="icon"
                icon="fa-solid fa-arrow-up-right-from-square" />
            </div>
            <div>
                <FontAwesomeIcon className="icon"
                icon="fa-solid fa-cart-shopping" />
            </div>
        </div>
    </div>
    itt meg ez lesz -> 
    <div className="recipes-grid">
        {
            recipes.map((r, i)=> 
                <RecipeC key={i} r={r}/>
            )
        }
    </div>
    fontos, hogy itt kell megadni a key={i} nem a másik oldalon és 
    r={r} meg azért kell, mert a RecipeC-n (function RecipeC({ r })) megadtuk az r-et egy props-ba 
    Tehát egy prop-ba a RecipeC-n megadtuk azokat az értékeket -> r.image, r.name stb. és ő innen ebből 
    a RecipesP-ből olvassa ki őket, azért kell itt megadni az r-t -> <RecipeC key={i} r={r}/>
    
    Fontos!!!!!!!!!!!!!!!!!!!!!!!!!!
    hogy a RecipesC-n a FontAwesome-os ikont beletesszük egy Link-be
    ezt tesszük bele egy link-be 
        <FontAwesomeIcon className="icon"
            icon="fa-solid fa-arrow-up-right-from-square" />

    <Link to={"/recipes/ + r.id"}>
            <FontAwesomeIcon className="icon"
        icon="fa-solid fa-arrow-up-right-from-square" />
    </Link>
    és ez a link vezessen el minket oda, hogy "recipe/ r.id"
    ez nagyon fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Link és utána a to={}, hogy hova vezessen el minket 
    ahol majd az URL-ben lesz az r.id

    Most, hogy az URL-ből megnyissuk az id-t mire van szükségünk -> 
    hogy készítsünk még egy route-ot 
    de ezt a route-ot egy bizonyos kompnensre fogjuk megoldani ehhez készítünk egy RecipeP.js-t!!!!!!!!!!!!!!!!!!!!!!!


    
*/ 
    return(
        <div className="container">
            <div className="recipes-grid">
                {
                    recipes.map((r, i)=> 
                        <RecipeC key={i} r={r}/>
                    )
                }
            </div>

        </div>
    );
}

export default RecipesP;