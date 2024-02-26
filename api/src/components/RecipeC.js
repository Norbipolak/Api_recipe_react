import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function RecipeC({ r }) {
    return(
        <div className="recipe">
        <div className="title">
            <h4>{r.name}</h4>
        </div>

        <div className="recipe-img">
            <img src={r.image}/>
        </div>

        <div className="recipe-controls">
            <div>
                <Link to={"/recipes/ + r.id"}>
                    <FontAwesomeIcon className="icon"
                        icon="fa-solid fa-arrow-up-right-from-square" />
                </Link>
            </div>
            <div>
                <FontAwesomeIcon className="icon"
                icon="fa-solid fa-cart-shopping" />
            </div>
        </div>
    </div>
    );
}

/*
nem itt fogja kapni a key={i} property-t 
<div key={i} className="recipe"> -> 
<div className="recipe">

hanem majd a RecipeP.js-ben lesz megadva neki 
szükségünk van itt is beolvasni a FontAwesomeIcon-t!!!!!!!!!!!!!
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
fontos, hogy ez a kettő felül importálva legyen 
*/

export default RecipeC;