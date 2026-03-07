import documentTypes from "../../../data/selects/statesTypes.json";
import userGroups from "../../../data/selects/userGroups.json"

export async function getDocumentTypes(){     
    return documentTypes();
} 

export async function getUsersGroups(){     
    return userGroups();
}