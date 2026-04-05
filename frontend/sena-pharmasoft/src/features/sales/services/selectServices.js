
import sellStates from "../../../data/selects/sellStates.json"
import paymenStates from "../../../data/selects/paymenStates.json"

export async function getSellStates(){     
    return sellStates;
} 

export async function getPaymentStates(){     
    return paymenStates;
}

