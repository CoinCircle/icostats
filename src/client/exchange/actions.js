// @flow
import * as shapeshift from 'shared/lib/shapeshift';
import { EventTypes } from '~/app/lib/analytics';
import type {
  ThunkAction,
  InitExchangeAction, SelectCoinAction, SetAmountAction, RequestQuoteAction,
  ReceiveQuoteAction, RequestLimitAction, ReceiveLimitAction,
  RequestShiftAction, ReceiveShiftAction, SetReceivingAddressAction,
  RequestValidateAddressAction, ReceiveValidateAddressAction,
  RequestOrderStatusAction, ReceiveOrderStatusAction, ErrorValidateAddressAction
} from './types';
import * as types from './constants';


export const initExchange = (toSymbol: string): InitExchangeAction => {
  const analytics = {
    type: EventTypes.track,
    payload: {
      category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
      action: types.INIT_EXCHANGE,
      label: toSymbol
    }
  };

  return {
    type: types.INIT_EXCHANGE,
    to: toSymbol,
    meta: { analytics }
  };
};

export function hideExchange() {
  const analytics = {
    type: EventTypes.track,
    payload: {
      category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
      action: types.HIDE_EXCHANGE,
      label: 'Closed Exchange'
    }
  };

  return {
    type: types.HIDE_EXCHANGE,
    meta: { analytics }
  };
}

export function setAmount(amount: number): SetAmountAction {
  const analytics = {
    type: EventTypes.track,
    payload: {
      category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
      action: types.SET_AMOUNT,
      label: 'Set amount to send',
      value: amount,
      amount
    }
  };

  return {
    type: types.SET_AMOUNT,
    amount,
    meta: { analytics }
  };
}

export const selectCoin = (
  which: string,
  symbol: string
): SelectCoinAction => ({
  type: types.SELECT_COIN,
  which,
  symbol,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
        action: types.SELECT_COIN,
        label: 'Select Coin',
        which,
        symbol
      }
    }
  }
});


export const requestQuote = (amount: number): RequestQuoteAction => ({
  type: types.REQUEST_QUOTE,
  amount,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
        action: types.REQUEST_COIN,
        label: 'Request Quote',
        amount
      }
    }
  }
});

const receiveQuote = (quote): ReceiveQuoteAction => ({
  type: types.RECEIVE_QUOTE,
  quote
});

export const fetchQuote = (
  pair: string,
  amount: number
): ThunkAction => (dispatch) => {
  dispatch(requestQuote(amount));
  return shapeshift.getQuote(amount, pair)
    .then(quote => dispatch(receiveQuote(quote)));
};


const requestLimit = (pair): RequestLimitAction => ({
  type: types.REQUEST_LIMIT,
  pair
});

const receiveLimit = (limit): ReceiveLimitAction => ({
  type: types.RECEIVE_LIMIT,
  limit
});

export const fetchLimit = (pair: string): ThunkAction => (dispatch) => {
  dispatch(requestLimit(pair));
  return shapeshift.getLimit(pair)
    .then(limit => dispatch(receiveLimit(limit)));
};

export const setReceivingAddress = (
  address: string
): SetReceivingAddressAction => ({
  type: types.SET_RECEIVING_ADDRESS,
  address,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
        action: types.SET_RECEIVING_ADDRESS,
        label: 'Set receiving address',
        address
      }
    }
  }
});

const requestValidateAddress = (
  address,
  symbol
): RequestValidateAddressAction => ({
  type: types.REQUEST_VALIDATE_ADDRESS,
  address,
  symbol
});

const receiveValidateAddress = (isValid): ReceiveValidateAddressAction => ({
  type: types.RECEIVE_VALIDATE_ADDRESS,
  isValid,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
        action: types.RECEIVE_VALIDATE_ADDRESS,
        label: `Set receiving address (${isValid ? 'VALID' : 'INVALID'})`,
        isValid
      }
    }
  }
});

const errorValidateAddress = (error): ErrorValidateAddressAction => ({
  type: types.ERROR_VALIDATE_ADDRESS,
  error,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        category: types.ANALYTICS_CATEGORY_SHAPESHIFT,
        action: types.ERROR_VALIDATE_ADDRESS
      }
    }
  }
});

export const fetchValidateAddress = (
  address: string,
  symbol: string
): ThunkAction => (dispatch) => {
  dispatch(requestValidateAddress(address, symbol));
  return shapeshift.validateAddress(address, symbol)
    .then(isValid => dispatch(receiveValidateAddress(isValid)))
    .catch(err => dispatch(errorValidateAddress(err)));
};


const requestShift = (withdrawalAddress, pair): RequestShiftAction => ({
  type: types.REQUEST_SHIFT,
  withdrawalAddress,
  pair
});

const receiveShift = ({ apiPubKey, ...payload }): ReceiveShiftAction => ({
  type: types.RECEIVE_SHIFT,
  payload,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        action: types.RECEIVE_SHIFT,
        properties: payload
      }
    }
  }
});

export const fetchShift = (
  withdrawalAddress: string,
  pair: string,
  returnAddress: string
): ThunkAction => (dispatch) => {
  dispatch(requestShift(withdrawalAddress, pair));
  return shapeshift.shift(withdrawalAddress, pair, returnAddress)
    .then(data => dispatch(receiveShift(data)));
};


const requestOrderStatus = (orderId): RequestOrderStatusAction => ({
  type: types.REQUEST_ORDER_STATUS,
  orderId
});

const receiveOrderStatus = (orderStatus): ReceiveOrderStatusAction => ({
  type: types.RECEIVE_ORDER_STATUS,
  orderStatus,
  // analytics
  meta: {
    analytics: {
      type: EventTypes.track,
      payload: {
        action: types.RECEIVE_ORDER_STATUS,
        properties: orderStatus
      }
    }
  }
});

export const fetchOrderStatus =
(orderId: string): ThunkAction => (dispatch) => {
  dispatch(requestOrderStatus(orderId));
  return shapeshift.getOrderInfo(orderId)
    .then(data => dispatch(receiveOrderStatus(data.status)));
};
