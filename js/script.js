let listOfIngredients = [];
let listOfUtensils = [];
let listOfAppliances = [];

async function structureData(recipes) {
    [listOfIngredients, listOfUtensils, listOfAppliances] = [...structureItems(recipes)];
}

                // liste deroulante
function structureItems(recipes) {
    let setOfIngredients = new Set();
    let setOfUtensils = new Set();
    let setOfAppliances = new Set();
    
    recipes.forEach(recipe => {
        setOfAppliances.add(recipe.appliance.toLowerCase());
        recipe.ingredients.forEach(ingredient => {
            setOfIngredients.add(ingredient.ingredient.toLowerCase());
        });
        recipe.ustensils.forEach(utensil => {
            setOfUtensils.add(utensil.toLowerCase());
        });
    });

    return [[...setOfIngredients], [...setOfUtensils], [...setOfAppliances]];
}

                // cards recettes
function createCard(recipe) {
    const card = document.createElement("article");
        card.classList.add("card");

               // recettes avec images
    const cardImg = document.createElement("img");           
        cardImg.classList.add("card-img-top");             
        cardImg.src = "assets/icons/logoIcon.svg";  
        cardImg.alt = "logo";                                 
        card.appendChild(cardImg); 
    
    // const placeholder = document.createElement("div")  
    //     placeholder.classList.add("card-img-top");   
    //     card.appendChild(placeholder);                     

    const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

    const recipeHeader = document.createElement("div");
        recipeHeader.classList.add("recipeHeader");
        cardBody.appendChild(recipeHeader);

    const recipeTitle = document.createElement("h2");
        recipeTitle.classList.add("recipeTitle");
        recipeTitle.textContent = recipe.name;
        recipeHeader.appendChild(recipeTitle);

    const recipeTime = document.createElement("div");
        recipeTime.classList.add("recipeTime");
        recipeHeader.appendChild(recipeTime);
        
    const recipeImg = document.createElement("img");
        recipeImg.classList.add("recipeImg");
        recipeImg.src = "assets/icons/time.svg";
        recipeImg.alt = "time";  
        recipeTime.appendChild(recipeImg);          

    const recipeMinutes = document.createElement("span");
        recipeMinutes.classList.add("recipeMinutes");
        recipeMinutes.textContent = recipe.time + " min"
        recipeTime.appendChild(recipeMinutes);

    const recipeIngredients = document.createElement("ul");
        recipeIngredients.classList.add("recipeIngredients");

        recipe.ingredients.forEach(ingredient => {
            const recipeIngredient = document.createElement("li");

            const recipeIngredientName = document.createElement("span");
                recipeIngredientName.classList.add("recipeIngredientName");
                recipeIngredientName.textContent = ingredient.ingredient + ": ";
                recipeIngredient.appendChild(recipeIngredientName);

            const recipeIngredientValue = document.createElement("span");
                recipeIngredientValue.classList.add("recipeIngredientValue");
                recipeIngredientValue.textContent = [ingredient.quantity, ingredient.unit].join(" ");
                recipeIngredient.appendChild(recipeIngredientValue);
                recipeIngredients.appendChild(recipeIngredient);
        });

        cardBody.appendChild(recipeIngredients);

        const recipePreparation = document.createElement("p");
            recipePreparation.classList.add("recipePreparation");
            recipePreparation.textContent = recipe.description;

        cardBody.appendChild(recipePreparation);
        card.appendChild(cardBody);
    return card;
}

function reloadCards() {
    document.querySelector("section").innerHTML = "";
    if (recipesFiltered != 0) {
        for (let i = 0; i < recipesFiltered.length ; i++) {
            document.querySelector("section").appendChild(createCard(recipesFiltered[i]));
        }
    } else {
        const h2 = document.createElement("h2");
              h2.classList.add("nothingAvailable");
              h2.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        document.querySelector("section").appendChild(h2);
    }
}

async function init() {
    await structureData(recipes);
    getDropdownsLists();
    reloadCards();
}

init();

let listOfIngredientsFiltered = listOfIngredients;
let listOfUtensilsFiltered = listOfUtensils;
let listOfAppliancesFiltered = listOfAppliances;

let listOfIngredientsFilteredSearch = listOfIngredientsFiltered;
let listOfAppliancesFilteredSearch = listOfAppliancesFiltered;
let listOfUtensilsFilteredSearch = listOfUtensilsFiltered;