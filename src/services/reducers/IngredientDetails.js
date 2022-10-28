import { SET_INGREDIENT, UNSET_INGREDIENT } from "../actions/IngredientDetails";

const initialState = {
    ingredientId: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT: {
            return {
                ...state,
                ingredientId: action.ingredientId,
            };
        }
        case UNSET_INGREDIENT: {
            return {
                ...state,
                ingredientId: null,
            };
        }
        default: {
            return state;
        }
    }
}