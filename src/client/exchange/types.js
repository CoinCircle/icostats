// @flow
import * as types from './constants';

export type $Quote = {
  quotedRate: number
}

export type $Limit = {
  limit: number,
  min: number,
  pair?: string
};

export type InitExchangeAction = { type: types.INIT_EXCHANGE, to: string };
export type SelectCoinAction =
  { type: types.SELECT_COIN, which: string, symbol: string };
export type SetAmountAction = { type: types.SET_AMOUNT, amount: number };
export type RequestQuoteAction = { type: types.REQUEST_QUOTE, amount: number };
export type ReceiveQuoteAction = { type: types.RECEIVE_QUOTE, quote: $Quote };
export type RequestLimitAction = { type: types.REQUEST_LIMIT, pair: string };
export type ReceiveLimitAction = { type: types.RECEIVE_LIMIT, limit: $Limit };
export type RequestShiftAction = {
  type: types.REQUEST_SHIFT,
  withdrawalAddress: string, pair: string
};
export type ReceiveShiftAction = {
  type: types.RECEIVE_SHIFT,
  payload: { deposit: string, orderId: string }
};
export type RequestAddressesAction = {
  type: types.REQUEST_ADDRESSES
};
export type ReceiveAddressesAction = {
  type: types.RECEIVE_ADDRESSES,
  addresses: Array<string>
};
export type SetReceivingAddressAction = {
  type: types.SET_RECEIVING_ADDRESS,
  address: string
};
export type RequestValidateAddressAction = {
  type: types.REQUEST_VALIDATE_ADDRESS,
  address: string,
  symbol: string
};
export type ReceiveValidateAddressAction = {
  type: types.RECEIVE_VALIDATE_ADDRESS,
  isValid: boolean
};
export type RequestOrderStatusAction = {
  type: types.REQUEST_ORDER_STATUS,
  orderId: string
};
export type ReceiveOrderStatusAction = {
  type: types.RECEIVE_ORDER_STATUS,
  orderStatus: string
};
export type ErrorValidateAddressAction = {
  type: types.ERROR_VALIDATE_ADDRESS,
  error: string
};

export type Action =
  | InitExchangeAction
  | SelectCoinAction
  | SetAmountAction
  | RequestQuoteAction
  | ReceiveQuoteAction
  | RequestLimitAction
  | ReceiveLimitAction
  | RequestShiftAction
  | ReceiveShiftAction
  | RequestAddressesAction
  | ReceiveAddressesAction
  | SetReceivingAddressAction
  | RequestValidateAddressAction
  | ReceiveValidateAddressAction
  | RequestOrderStatusAction
  | ReceiveOrderStatusAction
  | ErrorValidateAddressAction;


export type State = {
  isActive: boolean,
  from: string,
  to: string,
  amount: string | number,
  isFetchingQuote: boolean,
  didInvalidateQuote: boolean,
  quote?: $Quote,
  isFetchingLimit: boolean,
  didInvalidateLimit: boolean,
  limit?: $Limit,
  addresses?: Array<string>,
  isFetchingAddresses?: boolean,
  depositAddress?: string,
  receivingAddress?: string,
  isFetchingValidateAddress: boolean,
  didInvalidateValidateAddress: boolean,
  validateAddressError?: string,
  isReceivingAddressValid?: boolean,
  orderId?: string,
  orderStatus?: string,
  isFetchingOrderStatus: boolean,
  didInvalidateOrderStatus: boolean
};

export type ReduxState = State;

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
