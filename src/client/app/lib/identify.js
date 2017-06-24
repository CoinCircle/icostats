/**
 * get the coinbase if user is on a web 3 browser.
 */
import Promise from 'bluebird';

export default function identify() {
  if (window.web3 && window.web3.eth && window.web3.eth.getAccounts) {
    const getAccountsAsync = Promise.promisify(window.web3.eth.getAccounts);

    return getAccountsAsync().then((accounts) => {
      const account = accounts[0];

      if (account) {
        window.analytics.identify(account);
      }
    });
  }

  return false;
}
