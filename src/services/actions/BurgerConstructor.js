import { v4 as uuidv4 } from 'uuid';

export const SET_CONSTRUCTOR_INGREDIENT = "SET_CONSTRUCTOR_INGREDIENT";
export const SET_CONSTRUCTOR_BUN = "SET_CONSTRUCTOR_BUN";
export const REPLACE_CONSTRUCTOR_ITEM = "REPLACE_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";

export const addIngredient = (item) => {
    const uuid = uuidv4();

    return { type: SET_CONSTRUCTOR_INGREDIENT, item, uuid }
};