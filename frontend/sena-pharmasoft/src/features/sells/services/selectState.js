export async function getState(){
    const response = await fetch("/src/assets/data/selects/statesTypes.json")
        
    return response.json();

} 

