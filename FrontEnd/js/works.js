/**
 * Représentation du format des travaux
 */

class Works{
    constructor(jsonWorks){
        jsonWorks && Object.assign(this, jsonWorks);
    }
}

class Categories{
    constructor(jsonCategories){
        jsonCategories && Object.assign(this, jsonCategories);
    }
}

