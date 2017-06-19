// @flow
import * as shapeshift from 'shared/lib/shapeshift';
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
  if (window.ga) {
    window.ga('send', 'event', 'Exchange', 'Click Buy Now', toSymbol);
  }
  return {
    type: types.INIT_EXCHANGE,
    to: toSymbol
  };
};

export const hideExchange = () => ({
  type: types.HIDE_EXCHANGE
});

export const setAmount = (amount: number): SetAmountAction => ({
  type: types.SET_AMOUNT,
  amount
});

export const selectCoin = (
  which: string,
  symbol: string
): SelectCoinAction => ({
  type: types.SELECT_COIN,
  which,
  symbol
});


export const requestQuote = (amount: number): RequestQuoteAction => ({
  type: types.REQUEST_QUOTE,
  amount
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
  address
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
  isValid
});

const errorValidateAddress = (error): ErrorValidateAddressAction => ({
  type: types.ERROR_VALIDATE_ADDRESS,
  error
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

const receiveShift = (payload): ReceiveShiftAction => ({
  type: types.RECEIVE_SHIFT,
  payload
});

export const fetchShift = (
  withdrawalAddress: string,
  pair: string
): ThunkAction => (dispatch) => {
  dispatch(requestShift(withdrawalAddress, pair));
  return shapeshift.shift(withdrawalAddress, pair)
    .then(data => dispatch(receiveShift(data)));
};


const requestOrderStatus = (orderId): RequestOrderStatusAction => ({
  type: types.REQUEST_ORDER_STATUS,
  orderId
});

const receiveOrderStatus = (orderStatus): ReceiveOrderStatusAction => ({
  type: types.RECEIVE_ORDER_STATUS,
  orderStatus
});

export const fetchOrderStatus =
(orderId: string): ThunkAction => (dispatch) => {
  dispatch(requestOrderStatus(orderId));
  return shapeshift.getOrderInfo(orderId)
    .then(data => dispatch(receiveOrderStatus(data.status)));
};
