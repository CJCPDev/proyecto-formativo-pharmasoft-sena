export async function getPharmaUsers(){
    const response = await fetch("/src/data/selects/pharmaUsers.json")
        
    return response.json();

} 

