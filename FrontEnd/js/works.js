/**
 * Représentation du format des travaux
 */

class Works{
    constructor(jsonWorks){
        jsonWorks && Object.assign(this, jsonWorks);
    }
}

class WorksModale{
    constructor(jsonWorksModale){
        jsonWorksModale && Object.assign(this, jsonWorksModale);
    }
}