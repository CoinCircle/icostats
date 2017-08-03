/**
 * if user is on a web 3 browser
 * identify them in analytics via their coinbase
 */
 import getAccounts from './getAccounts';

 export default async function identify() {
   // take first account
   const [account] = await getAccounts();

   if (account) {
     window.analytics.identify(account);
   }
 }
