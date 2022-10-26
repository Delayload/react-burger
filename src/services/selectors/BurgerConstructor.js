import {pipe} from '../../utils/constants';

export const construcorSelector = (state) => state.selectedIngredients;

export const burgerConstructorDataSelector = pipe(construcorSelector, (selectedIngredients) => selectedIngredients.data);

export const burgerConstructorBunIdSelector = pipe(construcorSelector, (selectedIngredients) => selectedIngredients.bunId);

export const createBurgerConstructortSelector = (id) => pipe(construcorSelector, (selectedIngredients) => selectedIngredients.data.find(item => item._id === id));