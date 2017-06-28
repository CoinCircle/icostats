/**
 * if user is on a web 3 browser
 * identify them in analytics via their coinbase
 */
 import getAccount from './getAccount';

 export default async function identify() {
   const account = await getAccount();

   if (account) {
     window.analytics.identify(account);
   }
 }
