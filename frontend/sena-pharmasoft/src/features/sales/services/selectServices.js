import documentTypes from "../../../data/selects/statesTypes.json";
import userGroups from "../../../data/selects/userGroups.json"
import sellStates from "../../../data/selects/sellStates.json"

export async function getDocumentTypes(){     
    return documentTypes();
} 

export async function getUsersGroups(){     
    return userGroups();
}

export async function getSaleState() {
    return sellStates();
};