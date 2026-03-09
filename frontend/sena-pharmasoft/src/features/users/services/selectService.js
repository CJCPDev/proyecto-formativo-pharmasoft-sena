<<<<<<< HEAD
import documentTypes from "./../../../data/selects/documentTypes.json";
import userGroups from "./../../../data/selects/usersGroups.json"

export async function getDocumentTypes(){     
    return documentTypes();
} 

export async function getUsersGroups(){     
    return userGroups();
=======
import documentTypes from "../../../data/selects/documentTypes.json";
import userGroups from "../../../data/selects/userGroups.json"
/* import pharmaForm from '../../../data/selects/pharmaForm.json' */

export async function getDocumentTypes(){     
    return documentTypes();
>>>>>>> dev
} 

export async function getUsersGroups(){     
    return userGroups();
}

