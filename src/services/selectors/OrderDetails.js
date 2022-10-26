import {pipe} from '../../utils/constants';

export const orderSelector = (state) => state.order;

export const OrderNumberSelector = pipe(orderSelector, (order) => order.number);