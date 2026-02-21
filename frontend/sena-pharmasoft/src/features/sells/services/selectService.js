export async function getPharmaUsers(){
    const response = await fetch("/src/assets/data/selects/pharmaUsers.json")
        
    return response.json();

} 

