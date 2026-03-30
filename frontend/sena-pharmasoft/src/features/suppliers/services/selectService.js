export async function getSuppliersState() {
    const response = await fetch("/src/data/selects/getSuppliersState.json");

    return response.json();
};