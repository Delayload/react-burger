import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED,
    ORDER_UNSET,
} from "../actions/OrderDetails";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
};


export const OrderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                order: action.order,
            }
        }
        case ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            }
        }
        case ORDER_UNSET: {
            return {
                ...state,
                order: null,
            }
        }
        default: {
            return state;
        }
    }
}