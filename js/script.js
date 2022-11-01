let listOfIngredients = [];
let listOfUtensils = [];
let listOfAppliances = [];

async function structureData(recipes) {
    [listOfIngredients, listOfUtensils, listOfAppliances] = [...structureItems(recipes)];
}

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

async function init() {
    await structureData(recipes);
    getDropdownsLists();
}

init();

let listOfIngredientsFiltered = listOfIngredients;
let listOfUtensilsFiltered = listOfUtensils;
let listOfAppliancesFiltered = listOfAppliances;