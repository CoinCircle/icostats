/**
 * Integration with ShapeShift API.
 * @flow
 */
import fetch from 'isomorphic-fetch';
import settings from 'settings';

const BASE_URL = 'https://cors.shapeshift.io';
const API_KEY = settings.SHAPESHIFT_PUBLIC_KEY;
const API_SECRET = settings.SHAPESHIFT_SECRET;

export async function getCoins() {
  const res = await fetch(`${BASE_URL}/getcoins`);
  const json = await res.json();

  return json;
}

type $GetRateResponse = {
  depositAmount: string,
  expiration: number,
  maxLimit: number,
  minerFee: string,
  orderId: string,
  pair: string,
  quotedRate: string | number,
  withdrawalAmount: string
}

export async function getRate(pair: string) {
  const url = `${BASE_URL}/rate/${pair}`;
  const res = await fetch(url);
  const json: $GetRateResponse = await res.json();

  json.quotedRate = parseFloat(json.quotedRate);

  return json;
}

export async function getLimit(pair: string) {
  const url = `${BASE_URL}/limit/${pair}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function getOrderInfo(orderId: string) {
  const url = `${BASE_URL}/orderInfo/${orderId}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function getTransactions() {
  const url = `${BASE_URL}/txbyapikey/${API_SECRET}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function getTransactionsByAddress(address: string) {
  const url = `${BASE_URL}/txbyaddress/${address}/${API_SECRET}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function validateAddress(address: string, symbol: string) {
  const url = `${BASE_URL}/validateAddress/${address}/${symbol}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    return json.isvalid;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function shift(
  withdrawalAddress: string,
  pair: string, // [input coin]_[output coin]
  returnAddress: ?string, // return coins to this address in case of error
) {
  const url = `${BASE_URL}/shift`;
  const data = {
    withdrawal: withdrawalAddress,
    pair,
    returnAddress,
    apiKey: API_KEY
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();

  return json;
}

export async function mail(email: string, txid: string) {
  const url = `${BASE_URL}/mail`;
  const data = { email, txid };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();

  return json;
}

export async function getQuote(amount: number, pair: string) {
  const url = `${BASE_URL}/sendamount`;
  const data = { amount, pair };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();

  return json.success;
}

export async function cancelPending(address: string) {
  const url = `${BASE_URL}/cancelpending`;
  const data = { address };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();

  return json;
}
