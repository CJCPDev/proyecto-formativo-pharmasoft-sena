export async function getState(){
    const response = await fetch("/src/data/selects/statesTypes.json")
        
    return response.json();

} 

