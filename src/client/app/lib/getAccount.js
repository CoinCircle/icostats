/**
 * get the coinbase if user is on a web 3 browser.
 */
import Promise from 'bluebird';

export default async function getAccount() {
  const web3Enabled = (
    window.web3 &&
    window.web3.eth &&
    window.web3.eth.getAccounts
  );

  if (web3Enabled) {
    const getAccounts = Promise.promisify(window.web3.eth.getAccounts);
    const [account] = await getAccounts();

    return account;
  }

  return false;
}
