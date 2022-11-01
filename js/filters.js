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

function recipesTagFilter() {
    // Filtre cartes
    let itemsFiltered = [];
    for (let i = 0; i < recipesTagFiltered.length; i++) {
        const item = recipesTagFiltered[i];

        let haveIngredients = true;
        for (let j = 0; j < listOfIngredientsSelected.size; j++) {
            let haveIngredient = 0;
            for (let k = 0; k < item.ingredients.length; k++) {
                if (listOfIngredientsSelected.has(item.ingredients[k].ingredient.toLowerCase())) {
                    haveIngredient++;
                }
            }
            haveIngredients = haveIngredient === listOfIngredientsSelected.size ? true : false;
        }

        let haveUtensils = true;
        for (let j = 0; j < listOfUtensilsSelected.size; j++) {
            let haveUtensil = 0;
            for (let k = 0; k < item.ustensils.length; k++) {
                if (listOfUtensilsSelected.has(item.ustensils[k].toLowerCase())) {
                    haveUtensil++;
                }
            }
            haveUtensils = haveUtensil === listOfUtensilsSelected.size ? true : false;
        }

        let haveAppliance = true 
        if (listOfAppliancesSelected.size > 0 ) {
            haveAppliance = listOfAppliancesSelected.has(item.appliance.toLowerCase());
        }

        // Si tout est trouvé dans l'objet vérifié, on l'insère dans le tableau
        if (haveIngredients && haveUtensils && haveAppliance) {
            itemsFiltered.push(item);
        }
    }

    // Filtre dropdowns
    [listOfIngredientsFilteredTag, listOfUtensilsFilteredTag, listOfAppliancesFilteredTag] = [...structureItems(itemsFiltered)];
    [listOfIngredientsFiltered, listOfUtensilsFiltered, listOfAppliancesFiltered] = [listOfIngredientsFilteredTag, listOfUtensilsFilteredTag, listOfAppliancesFilteredTag];
    
    return itemsFiltered;
}

function recipesTagUpdate() {
    recipesTagFiltered = recipesTagFilter();
    recipesInputReload();
}

function recipesTagReload() {
    recipesTagFiltered = recipes;
    recipesTagUpdate();
}

function recipesInputFilter() {

    const inputFilter = document.querySelector(".search input").value.toLowerCase();
    let itemsFiltered = [];

    if (inputFilter.length >= 3) {
        // Filtre cartes
        for (let i = 0; i < recipesInputFiltered.length; i++) {
            const item = recipesInputFiltered[i];
            
            const isFilterInName = item.name.toLowerCase().includes(inputFilter);
            let isFilterInIngredients = false;
            for (let j = 0; j < item.ingredients.length; j++) {
                if (item.ingredients[j].ingredient.includes(inputFilter)) {
                    isFilterInIngredients = true;
                }
            }
            const isFilterInDescription = item.description.toLowerCase().includes(inputFilter);
        
            // Si la chaine de caractères est trouvée dans l'objet vérifié, on l'insère dans le tableau
            if (isFilterInName || isFilterInIngredients || isFilterInDescription) {
                itemsFiltered.push(item);
            }
        }

        // Filtre dropdowns
        [listOfIngredientsFilteredInput, listOfUtensilsFilteredInput, listOfAppliancesFilteredInput] = [...structureItems(itemsFiltered)];
        [listOfIngredientsFiltered, listOfUtensilsFiltered, listOfAppliancesFiltered] = [listOfIngredientsFilteredInput, listOfUtensilsFilteredInput, listOfAppliancesFilteredInput];
    
        getDropdownsLists();
    } else {
        itemsFiltered = recipesTagFiltered;
    }

    return itemsFiltered;
}

function recipesInputUpdate() {
    recipesInputFiltered = recipesInputFilter();
    recipesFiltered = recipesInputFiltered;
    getDropdownsLists();
    reloadCards();
}

function recipesInputReload() {
    recipesInputFiltered = recipesTagFiltered;
    recipesInputUpdate();
}