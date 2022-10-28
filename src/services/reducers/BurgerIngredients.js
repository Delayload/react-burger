import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/BurgerIngredients';

const initialState = {
    data: {},
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state, ingredientsFailed: false,
                ingredientsRequest: false,
                data: action.data.reduce((acc, curr) => {
                    acc[curr._id] = curr;
                    return acc;
                }, {}),
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: true, ingredientsRequest: false};
        }
        default: {
            return state;
        }
    }
}