import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './BurgerIngredients';
import { ingredientDetailsReducer } from './IngredientDetails';
import { burgerConstructorReducer } from './BurgerConstructor';
import { OrderDetailsReducer } from './OrderDetails';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    selectedIngredients: burgerConstructorReducer,
    order: OrderDetailsReducer,
});