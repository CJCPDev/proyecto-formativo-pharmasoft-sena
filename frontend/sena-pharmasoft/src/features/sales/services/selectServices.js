import documentTypes from "../../../data/selects/statesTypes.json";
import userGroups from "../../../data/selects/userGroups.json"


export async function getDocumentTypes(){     
    return documentTypes();
} 

export async function getUsersGroups(){     
    return userGroups();
}

export async function getSaleState() {
    const response = await fetch("/src/data/selects/sellStates.json");

    return response.json();
};