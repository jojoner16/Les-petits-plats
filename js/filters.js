let listOfIngredientsSelected = new Set();
let listOfUtensilsSelected = new Set();
let listOfAppliancesSelected = new Set();


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