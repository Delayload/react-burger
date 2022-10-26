import {postOrder} from '../../utils/api';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_UNSET = 'ORDER_UNSET';

function orderFailed() {
    return {
        type: ORDER_FAILED,
    };
}

export function makeOrder(ids) {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        });
        postOrder(ids).then(response => {
            console.log(response);
            if (response && response.success) {
                dispatch({
                    type: ORDER_SUCCESS, order: response.order
                });
            } else {
                dispatch(orderFailed());
            }
        }).catch(error => {
            dispatch(orderFailed());
        });
    };
}