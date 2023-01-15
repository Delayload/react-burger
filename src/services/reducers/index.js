import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './BurgerIngredients';
import { ingredientDetailsReducer } from './IngredientDetails';
import { burgerConstructorReducer } from './BurgerConstructor';
import { OrderDetailsReducer } from './OrderDetails';
import { authReducer } from './Auth';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    selectedIngredients: burgerConstructorReducer,
    order: OrderDetailsReducer,
    auth: authReducer,
});