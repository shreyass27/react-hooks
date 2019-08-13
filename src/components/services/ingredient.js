export const ingredientArray = function (response) {
    return Object.keys(response).map(key => ({
        id: key,
        ...response[key]
    }))
};

export async function postIngredient(ingredient) {
    try {
        const response = await fetch('https://react-hooks-2265b.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    } catch (error) {
        console.log('Error postIngredient(ingredient)  func', error);
    }
}

export async function getIngredient(filterStr) {
    try {
        const query = filterStr ? `?orderBy="title"&equalTo="${filterStr}"` : '';
        const response = await fetch(`https://react-hooks-2265b.firebaseio.com/ingredients.json${query}`, {
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    } catch (error) {
        console.log('Error getIngredient()  func', error);
    }
}