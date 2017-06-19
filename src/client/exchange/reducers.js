// @flow
/* eslint-disable newline-after-var, complexity */
import type { State, Action } from './types';
import * as types from './constants';

const initialState: State = {
  isActive: false,
  from: 'ETH',
  to: 'WINGS',
  amount: '',
  isFetchingQuote: false,
  didInvalidateQuote: false,
  isFetchingLimit: false,
  didInvalidateLimit: false,
  isFetchingValidateAddress: false,
  didInvalidateValidateAddress: false,
  isFetchingOrderStatus: false,
  didInvalidateOrderStatus: false
};
const exchangeReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {

    case types.INIT_EXCHANGE: {
      return {
        ...state,
        to: action.to,
        isActive: true
      };
    }

    case types.HIDE_EXCHANGE:
      return {
        ...state,
        isActive: false
      };

    case types.SELECT_COIN:
      return {
        ...state,
        [action.which]: action.symbol
      };

    case types.SET_AMOUNT:
      return {
        ...state,
        amount: action.amount
      };

    case types.REQUEST_QUOTE:
      return {
        ...state,
        isFetchingQuote: true,
        amount: action.amount
      };

    case types.RECEIVE_QUOTE:
      return {
        ...state,
        isFetchingQuote: false,
        didInvalidateQuote: false,
        quote: action.quote
      };

    case types.REQUEST_LIMIT:
      return {
        ...state,
        isFetchingLimit: true
      };

    case types.RECEIVE_LIMIT:
      return {
        ...state,
        isFetchingLimit: false,
        didInvalidateLimit: false,
        limit: action.limit
      };

    case types.SET_RECEIVING_ADDRESS:
      return {
        ...state,
        receivingAddress: action.address
      };

    case types.REQUEST_VALIDATE_ADDRESS:
      return {
        ...state,
        isFetchingValidateAddress: true
      };

    case types.RECEIVE_VALIDATE_ADDRESS:
      return {
        ...state,
        isFetchingValidateAddress: false,
        didInvalidateValidateAddress: false,
        isReceivingAddressValid: action.isValid
      };

    case types.ERROR_VALIDATE_ADDRESS:
      return {
        ...state,
        validateAddressError: action.error
      };

    case types.REQUEST_ORDER_STATUS:
      return {
        ...state,
        isFetchingOrderStatus: true
      };

    case types.RECEIVE_ORDER_STATUS:
      return {
        ...state,
        isFetchingOrderStatus: false,
        didInvalidateOrderStatus: false,
        orderStatus: action.orderStatus
      };

    case types.REQUEST_SHIFT:
      return {
        ...state,
        isFetchingShift: true
      };

    case types.RECEIVE_SHIFT:
      return {
        ...state,
        isFetchingShift: false,
        didInvalidateShift: false,
        depositAddress: action.payload.deposit,
        orderId: action.payload.orderId
      };

    default: return state;
  }
};

export default exchangeReducer;
