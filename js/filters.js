let listOfIngredientsSelected = new Set();
let listOfUtensilsSelected = new Set();
let listOfAppliancesSelected = new Set();

let listOfIngredientsFilteredTag = [];
let listOfUtensilsFilteredTag = [];
let listOfAppliancesFilteredTag = [];

let listOfIngredientsFilteredInput = [];
let listOfUtensilsFilteredInput = [];
let listOfAppliancesFilteredInput = [];

let recipesTagFiltered = recipes;
let recipesInputFiltered = recipesTagFiltered;
let recipesFiltered = recipesInputFiltered;


              // filtres menu déroulant
function dropdownFilterInput() {
    [listOfIngredientsFilteredSearch,listOfAppliancesFilteredSearch,listOfUtensilsFilteredSearch] = [[],[],[]];
    const inputs = document.querySelectorAll(".dropdown input");

    [...inputs].map( input => {
        inputValue = input.value.toLowerCase();

        switch (input.parentNode.dataset.type) {
            case "ingredient":
                listOfIngredientsFilteredSearch = listOfIngredientsFiltered.filter(
                    item => item.includes(inputValue)
                );
                break;
    
            case "appliance":
                listOfAppliancesFilteredSearch = listOfAppliancesFiltered.filter(
                    item => item.includes(inputValue)
                );
                break;
    
            case "utensil":
                listOfUtensilsFilteredSearch = listOfUtensilsFiltered.filter(
                    item => item.includes(inputValue)
                );
                break;
        }

    });
}

                // Filtre cartes
function recipesTagFilter() {
    let itemsFiltered = [];
    itemsFiltered = recipesTagFiltered.filter( 
        items => 
        [...listOfIngredientsSelected].every(
            ingredientSelected => items.ingredients.some(item => item.ingredient.toLowerCase() === ingredientSelected)
        ) &&
        [...listOfUtensilsSelected].every(
            ustensilSelected => items.ustensils.some(item => item.toLowerCase() === ustensilSelected)
        ) && 
        [...listOfAppliancesSelected].every(
            applianceSelected => items.appliance.toLowerCase() === applianceSelected
        )
    );

    // Filtre dropdowns
    [listOfIngredientsFilteredTag, listOfUtensilsFilteredTag, listOfAppliancesFilteredTag] = [...structureItems(itemsFiltered)];
    [listOfIngredientsFiltered, listOfUtensilsFiltered, listOfAppliancesFiltered] = [listOfIngredientsFilteredTag, listOfUtensilsFilteredTag, listOfAppliancesFilteredTag];
    
    return itemsFiltered;
}

async function recipesTagUpdate() {
    recipesTagFiltered = recipesTagFilter();
    recipesInputReload();
}

async function recipesTagReload() {
    recipesTagFiltered = recipes;
    recipesTagUpdate();
}

                                //barre de recherche fonctionnelle avec FILTER

function recipesInputFilter() {

    const inputFilter = document.querySelector(".search input").value.toLowerCase();
    let itemsFiltered = [];

    if (inputFilter.length >= 3) {
       
        itemsFiltered = recipesInputFiltered.filter(
            item => 
            item.name.toLowerCase().includes(inputFilter) ||
            item.ingredients.some(ingredientSelected => ingredientSelected.ingredient.includes(inputFilter)) || 
            item.description.toLowerCase().includes(inputFilter)
        );


        [listOfIngredientsFilteredInput, listOfUtensilsFilteredInput, listOfAppliancesFilteredInput] = [...structureItems(itemsFiltered)];
        [listOfIngredientsFiltered, listOfUtensilsFiltered, listOfAppliancesFiltered] = [listOfIngredientsFilteredInput, listOfUtensilsFilteredInput, listOfAppliancesFilteredInput];
    } else {
        itemsFiltered = recipesTagFiltered;
    }

    return itemsFiltered;
}

async function recipesInputUpdate() {
    recipesInputFiltered = recipesInputFilter();
    recipesFiltered = recipesInputFiltered;
    getDropdownsLists();
    reloadCards();
}

async function recipesInputReload() {
    recipesInputFiltered = recipesTagFiltered;
    recipesInputUpdate();
}