export const ingredientArray = function (response) {
    return Object.keys(response).map(key => ({
        id: key,
        ...response[key]
    }))
};

const ingredientsApi = 'https://react-hooks-2265b.firebaseio.com/ingredients';

export async function postIngredient(ingredient) {
    try {
        const response = await fetch(`${ingredientsApi}.json`, {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            return await response.json();
        }
        throw Error('API Failure');
    } catch (error) {
        console.log('Error postIngredient(ingredient) func', error);
        throw Error('API Failure');
    }
}

export async function deleteIngredient(ingredientId) {
    try {
        const response = await fetch(`${ingredientsApi}/${ingredientId}.json`, {
            method: 'DELETE'
        });

        if (response.ok) {
            return await response.json();
        }
        throw Error('API Failure');
    } catch (error) {
        console.log('Error postIngredient(ingredient) func', error);
        throw Error('API Failure');
    }
}


export async function getIngredient(filterStr) {
    try {
        const query = filterStr ? `?orderBy="title"&equalTo="${filterStr}"` : '';
        const response = await fetch(`${ingredientsApi}.json${query}`, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            return await response.json();
        }
        throw Error('API Failure');
    } catch (error) {
        console.log('Error getIngredient()  func', error);
        throw Error('API Failure');
    }
}