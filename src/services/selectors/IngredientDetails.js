import {pipe} from '../../utils/constants';

export const ingredientDetailsSelector = (state) => state.ingredientDetails;

export const ingredientDetailsDataSelector = pipe(ingredientDetailsSelector, (ingredientDetails) => ingredientDetails.ingredientId);