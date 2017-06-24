import Web3 from 'web3';

let didRun = false;

if (!didRun) {
  if (document.readyState === 'complete') {
    setWeb3();
  } else {
    window.addEventListener('load', setWeb3);
  }
}

function setWeb3() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // eslint-disable-next-line
    console.log('No provider found, falling back to RPC');
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');

    window.web3 = new Web3(provider);
  }

  didRun = true;
}
