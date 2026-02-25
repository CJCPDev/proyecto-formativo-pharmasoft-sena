import documentTypes from "./../../../assets/data/selects/documentTypes.json";
import userGroups from "./../../../assets/data/selects/usersGroups.json"

export async function getDocumentTypes(){     
    return documentTypes();
} 

export async function getUsersGroups(){     
    return userGroups();
} 

