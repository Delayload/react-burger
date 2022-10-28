import {getIngredientsRequest} from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

function getIngredientsFailed() {
    return {
        type: GET_INGREDIENTS_FAILED,
    };
}

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientsRequest().then(response => {
            if (response && response.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS, data: response.data
                });
            } else {
                dispatch(getIngredientsFailed());
            }
        }).catch(error => {
            dispatch(getIngredientsFailed());
        });
    };
}