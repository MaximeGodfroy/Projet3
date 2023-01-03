/**
 * Représentation du format des travaux
 */

class Works{
    constructor(jsonWorks){
        jsonWorks && Object.assign(this, jsonWorks);
    }
}