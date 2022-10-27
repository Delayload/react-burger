import {
    SET_CONSTRUCTOR_INGREDIENT,
    SET_CONSTRUCTOR_BUN,
    REPLACE_CONSTRUCTOR_ITEM,
    DELETE_CONSTRUCTOR_INGREDIENT,
} from "../actions/BurgerConstructor";

const initialState = {
    data: [],
    bunId: null,
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        ...action.item,
                        count: 1,
                        uuid: action.uuid,
                    }
                ],
            };
        }
        case REPLACE_CONSTRUCTOR_ITEM : {
            const newIndex = action.newIndex
            const oldIndex = action.oldIndex
            const newConstructorItems = [...state.data]
            newConstructorItems.splice(newIndex, 0, newConstructorItems.splice(oldIndex, 1)[0]);
            return {
                ...state,
                data: newConstructorItems
            }
        }
        case SET_CONSTRUCTOR_BUN: {
            return {
                ...state,
                bunId: action._id,
            }
        }
        case DELETE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                data: state.data.filter(item => item.uuid !== action.uuid)
            }
        }
        default: {
            return state;
        }
    }
}