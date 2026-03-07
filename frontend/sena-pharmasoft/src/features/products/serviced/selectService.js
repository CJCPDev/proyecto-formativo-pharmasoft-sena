import pharmaForm from "../../../data/selects/pharmaForm.json";
import administrationTypes from "../../../data/selects/administrationTypes.json";
import statesTypes from "../../../data/selects/statesTypes.json";
import suppliers from "../../../data/selects/suppliers.json";
import laboratoriesTypes from "../../../data/selects/laboratoriesTypes.json";

export async function getPharmaForm(){     
    return pharmaForm();
} 
export async function getAdministrationTypes(){     
    return administrationTypes();
} 
export async function getStatesTypes(){     
    return statesTypes();
} 
export async function getSuppliers(){     
    return suppliers();
} 
export async function getLaboratoriesTypes(){     
    return laboratoriesTypes();
} 


