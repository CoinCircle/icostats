/* eslint-disable */
module.exports = [
  /**
   * Sources:
   * https://www.cryptocoinsnews.com/santiment-raises-12-215-million-in-two-stage-token-crowdsale/
   * https://www.finextra.com/pressarticle/69964/crypto-market-data-feed-platform-santiment-closes-12m-token-sale
   * http://www.econotimes.com/Crypto-market-datafeeds-platform-Santiment-raises-12M-in-two-stage-crowdsale-792019
   */
  {
    id: 'santiment',
    symbol: 'SAN',
    is_erc20: true,
    contract_address: '0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098',
    name: 'Santiment',
    symbol: 'SAN',
    ticker: 'santiment',
    eth_price_at_launch: 265.82,
    btc_price_at_launch: 2604.55,
    raise: 12215250,
    amount_sold_in_ico: 45000000,
    start_date: '07/04/2017',
    supported_changelly: false
  },
  {
    id: 'eos',
    is_erc20: true,
    contract_address: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
    name: 'EOS',
    symbol: 'EOS',
    ticker: 'eos',
    eth_price_at_launch: 262.38,
    btc_price_at_launch: 2508.52,
    raise: 185000000,
    amount_sold_in_ico: 200000000,
    start_date: '06/26/2017',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * Voise team member
     */
    id: 'voise',
    is_erc20: true,
    name: 'Voise',
    symbol: 'VSM',
    eth_price_at_launch: 248.04,
    btc_price_at_launch: 2628.94,
    raise: 715835,
    amount_sold_in_ico: 825578,
    start_date: '06/05/2017',
    ticker: 'voise',
    supported_changelly: false
  },
  {
    id: 'darcrus',
    is_erc20: false,
    name: 'Darcrus',
    symbol: 'DAR',
    eth_price_at_launch: 7.92,
    btc_price_at_launch: 824.23,
    raise: 285203,
    amount_sold_in_ico: 14055048,
    start_date: '12/21/2016',
    ticker: 'darcrus',
    supported_changelly: true
  },
  {
    /**
     * Sources:
     * https://qtum.org/en/crowdsale
     * https://tokenmarket.net/blockchain/bitcoin/assets/qtum/
     */
    id: 'qtum',
    is_erc20: false,
    name: 'QTUM',
    symbol: 'QTUM',
    eth_price_at_launch: 22.18,
    btc_price_at_launch: 1181.17,
    // 11,156.766 BTC + 77,081.031 ETH = $13178037.29622 + $1709657.26758
    raise: 14887694.5638,
    raise_by_currency: {
      btc: 11156.766,
      eth: 77081.031
    },
    amount_sold_in_ico: 51000000,
    start_date: '03/12/2017',
    ticker: 'qtum',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * https://steemit.com/qrl/@kevinternet/qrl-quantum-resistant-ledger-price-forecast
     * https://tokenmarket.net/blockchain/blockchain/assets/quantum-resistant/
     */
    id: 'quantum-resistant-ledger',
    is_erc20: true,
    name: 'Quantum Resistant Ledger',
    symbol: 'QRL',
    eth_price_at_launch: 205.55,
    btc_price_at_launch: 2252.71,
    raise: 4000000, // Unknown BTC and ETH amount
    amount_sold_in_ico: 52000000,
    start_date: '05/01/2017',
    ticker: 'quantum-resistant-ledger',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * https://twitter.com/MysteriumNet/status/869678853404454914
     * https://www.smithandcrown.com/sale/mysterium2/
     *
     * Calculation for amount sold:
     * - 14 million CHF hard cap
     * - 6 million of them were priced at 1.2 MYST per CHF (= 7.2M MYST)
     * - Remaining 8 million were 1 MUST per CHF
     * - Adds up to 15.2 million total possible to buy, and hard cap was reached
     */
    id: 'mysterium',
    is_erc20: true,
    name: 'Mysterium',
    symbol: 'MYST',
    eth_price_at_launch: 205.55,
    btc_price_at_launch: 2252.71,
    raise: 14106690.95, // 68629 ETH
    amount_sold_in_ico: 15200000,
    start_date: '05/30/2017',
    ticker: 'mysterium',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * https://bitcointalk.org/index.php?topic=1262688.0
     * https://bitcointalk.org/index.php?topic=1262688.0 https://medium.com/@cryptojudgement/iota-promise-of-a-bright-crypto-future-6b7517349e32
     */
    id: 'iota',
    is_erc20: false,
    name: 'IOTA',
    symbol: 'MIOTA',
    eth_price_at_launch: 0.883399,
    btc_price_at_launch: 324.99,
    raise: 434511.63,
    raise_by_currency: {
      btc: 1337
    },
    amount_sold_in_ico: 999999999,
    start_date: '11/25/2015',
    ticker: 'iota',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * http://www.blockchaindailynews.com/MetaX-Completes-10-Million-adToken-ADT-Sale_a25622.html
     */
    id: 'adtoken',
    is_erc20: true,
    name: 'adToken',
    symbol: 'ADT',
    eth_price_at_launch: 262.38,
    btc_price_at_launch: 2508.52,
    raise: 8746000.0017492,
    raise_by_currency: {
      eth: 33333.33334
    },
    amount_sold_in_ico: 1000000000,
    start_date: '06/26/2017', // ref.
    ticker: 'adtoken',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/
     * https://blog.ethereum.org/2014/08/08/ether-sale-a-statistical-overview/
     *
     * Notes:
     * - ICO price was 2000 ETH for 1 BTC
     */
    id: 'ethereum',
    is_erc20: false,
    name: 'Ethereum',
    symbol: 'ETH',
    eth_price_at_launch: 0.31142, // 2000 ETH = 1 BTC
    btc_price_at_launch: 622.84,
    raise: 15571000,
    amount_sold_in_ico: 50000000,
    start_date: '07/22/2014',
    ticker: 'ethereum',
    supported_changelly: true,
    raise_by_currency: {
      btc: 25000
    }
  },
  {
    /**
     * Sources:
     * https://wallet.aeternity.com/
     * https://www.smithandcrown.com/aeternity-token-sale-ico-oracle-machine/
     * https://wallet.aeternity.com/
     */
    id: 'aeternity',
    is_erc20: false,
    name: 'Aeternity Phase I',
    symbol: 'AE',
    eth_price_at_launch: 45.88,
    btc_price_at_launch: 1129.90,
    // (121,396.731 ETH + 328.628 BTC) = ($5569682.01828 + $371316.7772)
    raise: 5940998.795,
    raise_by_currency: {
      eth: 121396.731,
      btc: 328.628
    },
    amount_sold_in_ico: 139089935.082, // ref
    start_date: '04/03/2017', // ref.
    ticker: 'aeternity',
    supported_changelly: false
  },
  {
    /**
     * Source:
     * Calculated by reading contract on etherscan
     *
     * NOTE The amount of tokens distributed to ICO participants was not static,
     * it was determined by a formula within the smart contract.
     *
     * Total supply of SNT: 6804870174
     * --- Breakdown ---
     * Devs: 20%
     * Reserve: 29%
     * SGT: 6.9%
     *   - Formula to calculate SGT percentage:
     *      = 10% * (Total SGT supply / Max SGT Supply)
     *      = 10% * (346447013 / 500000000)
     *      = .069
     * Contributors: 44.1% (100 - 20 - 29 - 6.9)
     */
    id: 'status',
    ticker: 'status',
    name: 'Status',
    is_erc20: true,
    contract_address: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
    symbol: 'SNT',
    eth_price_at_launch: 364.96,
    btc_price_at_launch: 2648.93,
    raise: 109488000,
    raise_by_currency: {
      eth: 300000
    },
    amount_sold_in_ico: 3000947746,
    start_date: '06/20/2017',
    supported_changelly: false,
    icon_ext: 'svg'
  },
  {
    id: 'bancor',
    ticker: 'bancor',
    is_erc20: true,
    contract_address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
    name: 'Bancor',
    symbol: 'BNT',
    eth_price_at_launch: 390,
    btc_price_at_launch: 2779.12,
    raise: 153000000,
    raise_by_currency: {
      eth: 396720
    },
    amount_sold_in_ico: 39600000,
    start_date: '06/12/2017',
    supported_changelly: false
  },
  {
    id: 'cofoundit',
    ticker: 'cofound-it',
    is_erc20: true,
    contract_address: '0x12FEF5e57bF45873Cd9B62E9DBd7BFb99e32D73e',
    name: 'Cofound.it',
    symbol: 'CFI',
    eth_price_at_launch: 264.83,
    btc_price_at_launch: 2690.02,
    raise: 14980108.95,
    raise_by_currency: {
      eth: 56565
    },
    amount_sold_in_ico: 125000000,
    start_date: '06/07/2017', // or june 3 for presale
    supported_changelly: false
  },
  {
    id: 'patientory',
    is_erc20: true,
    contract_address: '0x8ae4bf2c33a8e667de34b54938b0ccd03eb8cc06',
    name: 'Patientory',
    symbol: 'PTOY',
    eth_price_at_launch: 223,
    btc_price_at_launch: 2303,
    raise: 7254161.01, // based on ETH raise
    raise_by_currency: {
      eth: 32529.87
    },
    amount_sold_in_ico: 70000000,
    start_date: '05/31/2017',
    ticker: 'patientory',
    supported_changelly: false
  },
  {
    id: 'basic-attention-token',
    is_erc20: true,
    contract_address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    name: 'Basic Attention Token',
    symbol: 'BAT',
    eth_price_at_launch: 224.90,
    btc_price_at_launch: 2271.35,
    raise: 35000000,
    amount_sold_in_ico: 1000000000,
    start_date: '05/31/2017',
    ticker: 'basic-attention-token',
    supported_changelly: false,
    icon_ext: 'svg'
  },
  {
    id: 'bitcrystals',
    is_erc20: false,
    name: 'Bitcrystals',
    symbol: 'BCY',
    eth_price_at_launch: 0.30,
    btc_price_at_launch: 288,
    raise: 269029.44, // 934.13 BTC
    amount_sold_in_ico: 13521238.01,
    start_date: '07/29/2015',
    ticker: 'bitcrystals',
    supported_changelly: true
  },
  {
    id: 'swarm-city',
    is_erc20: true,
    contract_address: '0xb9e7f8568e08d5659f5d29c4997173d84cdf2607',
    name: 'Swarm City',
    symbol: 'SWT',
    eth_price_at_launch: 10.83,
    btc_price_at_launch: 744.60,
    raise: 841350.21, // 77687 ETH
    amount_sold_in_ico: 9525397,
    start_date: '11/01/2016',
    ticker: 'swarm-city',
    supported_changelly: true
  },
  {
    id: 'plutus',
    is_erc20: true,
    contract_address: '0xD8912C10681D8B21Fd3742244f44658dBA12264E',
    name: 'Plutus',
    symbol: 'PLU',
    eth_price_at_launch: 12.488,
    btc_price_at_launch: 667.81,
    raise: 1005487.65,
    amount_sold_in_ico: 850000,
    start_date: '06/21/2016',
    ticker: 'pluton',
    icon_ext: 'svg',
    supported_changelly: false
  },
  {
    id: 'bcap',
    is_erc20: true,
    contract_address: '0xFf3519eeeEA3e76F1F699CCcE5E23ee0bdDa41aC',
    name: 'Blockchain Capital',
    symbol: 'BCAP',
    eth_price_at_launch: 43.83,
    btc_price_at_launch: 1223.99,
    raise: 10000000,
    amount_sold_in_ico: 10000000,
    start_date: '04/10/2017',
    ticker: 'bcap',
    supported_changelly: false
  },
  {
    id: 'stratis',
    is_erc20: false,
    name: 'Stratis',
    symbol: 'STRAT',
    eth_price_at_launch: 13.89,
    btc_price_at_launch: 667.66,
    raise: 610908, // 915 BTC raised
    amount_sold_in_ico: 84000000,
    start_date: '06/20/2016',
    ticker: 'stratis',
    supported_changelly: true
  },
  {
    id: 'etheroll',
    is_erc20: true,
    contract_address: '0x2e071D2966Aa7D8dECB1005885bA1977D6038A65',
    name: 'Etheroll',
    symbol: 'DICE',
    eth_price_at_launch: 13.14,
    btc_price_at_launch: 1012.11,
    raise: 311162.77,
    total_amount_of_tokens: 7001622.64879,
    amount_sold_in_ico: 4501622,
    start_date: '02/13/2017',
    ticker: 'etheroll',
    supported_changelly: false
  },
  {
    id: 'humaniq',
    is_erc20: true,
    name: 'Humaniq',
    symbol: 'HMQ',
    eth_price_at_launch: 43.31,
    btc_price_at_launch: 1192.29,
    raise: 5163000,
    total_amount_of_tokens: 184190414,
    amount_sold_in_ico: 131038286,
    start_date: '04/06/2017',
    ticker: 'humaniq',
    supported_changelly: false
  },
  {
    id: 'waves',
    symbol: 'WAVES',
    is_erc20: false,
    name: 'Waves',
    eth_price_at_launch: 7.44,
    btc_price_at_launch: 377,
    raise: 16010008,
    total_amount_of_tokens: 100000000,
    amount_sold_in_ico: 85000000,
    start_date: '4/12/2016',
    ico_end_date: '2016-05-31',
    ticker: 'waves',
    supported_changelly: true
  },
  {
    id: 'tokencard',
    symbol: 'TKN',
    is_erc20: true,
    contract_address: '0xaaaf91d9b90df800df4f55c205fd6989c977e73a',
    btc_price_at_launch: 1315,
    name: 'Tokencard',
    raise: 12700000,
    total_amount_of_tokens: 39406760,
    amount_sold_in_ico: 23644056,
    start_date: '5/2/2017',
    ico_end_date: '2017-05-02',
    eth_price_at_launch: 80.64,
    ticker: 'tokencard',
    supported_changelly: false
  },
  {
    id: 'gnosis',
    symbol: 'GNO',
    name: 'Gnosis',
    is_erc20: true,
    btc_price_at_launch: 1155.05,
    raise: 10682516,
    total_amount_of_tokens: '10,000,000',
    amount_sold_in_ico: 418760,
    start_date: '4/24/2017',
    ico_end_date: '2017-04-24',
    eth_price_at_launch: 49.19,
    ticker: 'gnosis-gno',
    supported_changelly: true
  },
  {
    id: 'rlc',
    symbol: 'RLC',
    name: 'iEx.ec',
    is_erc20: true,
    btc_price_at_launch: 1127.85,
    raise: 10682516,
    total_amount_of_tokens: '87,000,000',
    amount_sold_in_ico: 60000000,
    start_date: '4/19/2017',
    ico_end_date: '2017-04-19',
    eth_price_at_launch: 49.5,
    ticker: 'rlc',
    supported_changelly: true
  },
  {
    id: 'iconomi',
    symbol: 'ICN',
    name: 'Iconomi',
    is_erc20: true,
    btc_price_at_launch: 510.91,
    raise: 10682516,
    total_amount_of_tokens: '100,000,000',
    amount_sold_in_ico: 85000000,
    start_date: '08/25/2016',
    ico_end_date: '2016-09-26',
    eth_price_at_launch: 10.99,
    ticker: 'iconomi',
    supported_changelly: false
  },
  {
    id: 'golem',
    symbol: 'GNT',
    name: 'Golem',
    is_erc20: true,
    btc_price_at_launch: 661.99,
    contract_address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
    raise: 8596000,
    total_amount_of_tokens: '1,000,000,000',
    amount_sold_in_ico: 820000000,
    start_date: '11/11/2016',
    ico_end_date: '2016-11-13',
    eth_price_at_launch: 10.46,
    ticker: 'golem-network-tokens',
    supported_changelly: true
  },
  {
    id: 'taas',
    symbol: 'TAAS',
    name: 'TaaS',
    is_erc20: true,
    contract_address: '0xe7775a6e9bcf904eb39da2b68c5efb4f9360e08c',
    btc_price_at_launch: 952.99,
    raise: 7963120,
    total_amount_of_tokens: '',
    amount_sold_in_ico: 7963120,
    start_date: '3/27/2017',
    ico_end_date: '2017-04-28',
    eth_price_at_launch: 50.54,
    ticker: 'taas',
    supported_changelly: false
  },
  {
    id: 'singulardtv',
    symbol: 'SNGLS',
    name: 'SingularDTV',
    is_erc20: true,
    contract_address: '0xaec2e87e0a235266d9c5adc9deb4b2e29b54d009',
    eth_price_at_launch: 13.3,
    btc_price_at_launch: 550.48,
    raise: 7500000,
    total_amount_of_tokens: '1,000,000,000',
    amount_sold_in_ico: 500000000,
    start_date: '10/5/2016',
    ico_end_date: '2016-10-29',
    ticker: 'singulardtv',
    supported_changelly: true
  },
  {
    name: 'Lisk',
    symbol: 'LSK',
    is_erc20: false,
    raise: 6500000,
    total_amount_of_tokens: '100,000,000',
    amount_sold_in_ico: 85000000,
    start_date: '2/22/2016',
    ico_end_date: '2016-03-21',
    eth_price_at_launch: 1.12,
    btc_price_at_launch: 393.98,
    ticker: 'lisk',
    id: 'lisk',
    supported_changelly: true
  },
  {
    id: 'matchpool',
    symbol: 'GUP',
    name: 'Matchpool',
    is_erc20: true,
    contract_address: '0xf7b098298f7c69fc14610bf71d5e02c60792894c',
    raise: 5700000,
    total_amount_of_tokens: '100,000,000',
    amount_sold_in_ico: 60000000,
    start_date: '4/2/2017',
    ico_end_date: '2017-04-04',
    eth_price_at_launch: 50.75,
    btc_price_at_launch: 1030.59,
    ticker: 'guppy',
    supported_changelly: true
  },
  {
    id: 'digixdao',
    symbol: 'DGD',
    name: 'DigixDAO',
    is_erc20: true,
    contract_address: '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a',
    raise: 5500000,
    total_amount_of_tokens: '2,000,000',
    amount_sold_in_ico: 1700000,
    start_date: '3/1/2016',
    ico_end_date: '2016-03-01',
    eth_price_at_launch: 7.7,
    btc_price_at_launch: 396.49,
    ticker: 'digixdao',
    supported_changelly: true
  },
  {
    id: 'firstblood',
    symbol: '1ST',
    name: 'FirstBlood',
    is_erc20: true,
    contract_address: '0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7',
    raise: 5500000,
    total_amount_of_tokens: '85,558,364',
    amount_sold_in_ico: 85558364,
    start_date: '9/25/2016',
    ico_end_date: '2016-09-27',
    eth_price_at_launch: 12.93,
    btc_price_at_launch: 535.95,
    ticker: 'firstblood',
    supported_changelly: false
  },
  {
    name: 'ChronoBank',
    symbol: 'TIME',
    is_erc20: true,
    contract_address: '0x6531f133e6DeeBe7F2dcE5A0441aA7ef330B4e53',
    raise: 5400000,
    total_amount_of_tokens: '710,113',
    amount_sold_in_ico: 710113,
    start_date: '12/15/2016',
    ico_end_date: '2017-02-15',
    eth_price_at_launch: 8.21,
    btc_price_at_launch: 747.24,
    ticker: 'chronobank',
    id: 'chronobank',
    supported_changelly: true
  },
  {
    name: 'Augur',
    symbol: 'REP',
    is_erc20: true,
    eth_price_at_launch: 1.26,
    btc_price_at_launch: 434.02,
    contract_address: '0x48c80F1f4D53D5951e5D5438B54Cba84f29F32a5',
    raise: 5300000,
    total_amount_of_tokens: '11,000,000',
    amount_sold_in_ico: 8800000,
    start_date: '8/1/2015',
    ico_end_date: '2015-10-01',
    ticker: 'augur',
    id: 'augur',
    supported_changelly: true
  },
  {
    id: 'wetrust',
    symbol: 'TRST',
    name: 'WeTrust',
    is_erc20: true,
    contract_address: '0xcb94be6f13a1182e4a4b6140cb7bf2025d28e41b',
    raise: 5000000,
    total_amount_of_tokens: '100,000,000',
    amount_sold_in_ico: 80000000,
    start_date: '3/2/2017',
    ico_end_date: '2017-04-14',
    eth_price_at_launch: 17.04,
    btc_price_at_launch: 1192.549,
    ticker: 'trust',
    supported_changelly: true
  },
  {
    name: 'Lunyr',
    symbol: 'LUN',
    is_erc20: true,
    contract_address: '0xfa05A73FfE78ef8f1a739473e462c54bae6567D9',
    raise: 3400000,
    total_amount_of_tokens: '2,703,356',
    amount_sold_in_ico: 2108618,
    start_date: '3/29/2017',
    ico_end_date: '2017-04-26',
    eth_price_at_launch: 50.23,
    btc_price_at_launch: 962,
    ticker: 'lunyr',
    id: 'lunyr',
    supported_changelly: false
  },
  {
    id: 'melonport',
    symbol: 'MLN',
    name: 'Melonport',
    is_erc20: true,
    contract_address: '0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
    raise: 2900000,
    total_amount_of_tokens: '750,000',
    amount_sold_in_ico: 500000,
    start_date: '2/15/2017',
    ico_end_date: '2017-02-16',
    eth_price_at_launch: 13.05,
    btc_price_at_launch: 959.2,
    ticker: 'melon',
    supported_changelly: true
  },
  {
    id: 'lykke',
    symbol: 'LKK',
    name: 'Lykke',
    is_erc20: false,
    raise: 2800000,
    total_amount_of_tokens: '1,285,690,000',
    amount_sold_in_ico: 50000000,
    start_date: '9/16/2016',
    ico_end_date: '2016-10-09',
    eth_price_at_launch: 11.94,
    btc_price_at_launch: 544.68,
    ticker: 'lykke',
    icon_ext: 'svg',
    supported_changelly: false
  },
  {
    name: 'Edgeless',
    symbol: 'EDG',
    is_erc20: true,
    contract_address: '0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c',
    raise: 2700000,
    total_amount_of_tokens: '132,046,997',
    amount_sold_in_ico: 68878821,
    start_date: '2/28/2017',
    ico_end_date: '2017-03-21',
    eth_price_at_launch: 15.52,
    btc_price_at_launch: 1117.87,
    ticker: 'edgeless',
    id: 'edgeless',
    icon_ext: 'jpg',
    supported_changelly: true
  },
  {
    name: 'Wings',
    symbol: 'WINGS',
    is_erc20: true,
    contract_address: '0x667088b212ce3d06a1b553a7221E1fD19000d9aF',
    raise: 2074000,
    total_amount_of_tokens: '100,000,000',
    amount_sold_in_ico: 75000000,
    start_date: '11/18/2016',
    ico_end_date: '2017-01-06',
    eth_price_at_launch: 9.9,
    btc_price_at_launch: 705.51,
    ticker: 'wings',
    id: 'wings',
    supported_changelly: true
  },
  {
    name: 'Komodo',
    symbol: 'KMD',
    is_erc20: false,
    raise: 1983781,
    total_amount_of_tokens: '',
    amount_sold_in_ico: 5272740,
    start_date: '10/15/2016',
    ico_end_date: '11/14/2016',
    eth_price_at_launch: 11.93,
    btc_price_at_launch: 582.9,
    ticker: 'komodo',
    id: 'komodo',
    icon_ext: 'gif',
    supported_changelly: false
  },
  {
    name: 'vDice',
    symbol: 'VSL',
    is_erc20: true,
    contract_address: '0x5c543e7AE0A1104f78406C340E9C64FD9fCE5170',
    raise: 1800000,
    total_amount_of_tokens: '33,390,496',
    amount_sold_in_ico: 33390496,
    start_date: '11/15/2016',
    ico_end_date: '2016-12-15',
    eth_price_at_launch: 9.99,
    btc_price_at_launch: 660.06,
    ticker: 'vslice',
    id: 'vslice',
    supported_changelly: true
  },
  {
    name: 'Incent',
    symbol: 'INCNT',
    is_erc20: false,
    raise: 1000000,
    total_amount_of_tokens: '46,016,625',
    amount_sold_in_ico: 23008312,
    start_date: '9/1/2016',
    ico_end_date: '2016-09-01',
    eth_price_at_launch: 11.63,
    btc_price_at_launch: 509.749,
    ticker: 'incent',
    id: 'incent',
    supported_changelly: false
  },
  {
    name: 'Ark',
    symbol: 'ARK',
    is_erc20: false,
    raise: 942593,
    total_amount_of_tokens: '125,945,480',
    amount_sold_in_ico: 94695480,
    start_date: '11/7/2016',
    ico_end_date: '2016-12-11',
    eth_price_at_launch: 10.96,
    btc_price_at_launch: 556.00,
    ticker: 'ark',
    id: 'ark',
    supported_changelly: false
  },
  {
    name: 'BlockPay',
    symbol: 'BLOCKPAY',
    is_erc20: false,
    raise: 675000,
    total_amount_of_tokens: '98,928,316',
    amount_sold_in_ico: 5428300,
    start_date: '8/20/2016',
    ico_end_date: '2016-09-05',
    eth_price_at_launch: 10.75,
    btc_price_at_launch: 515.103,
    ticker: 'blockpay',
    id: 'blockpay',
    supported_changelly: false
  },
  {
    id: 'hackergold',
    symbol: 'HKG',
    name: 'Virtual Accelerator',
    is_erc20: true,
    contract_address: '0x14f37b574242d366558db61f3335289a5035c506',
    raise: 645000,
    total_amount_of_tokens: '16,110,893',
    amount_sold_in_ico: 16110893,
    start_date: '10/20/2016',
    ico_end_date: '2016-12-21',
    eth_price_at_launch: 12.09,
    btc_price_at_launch: 579.65,
    ticker: 'hacker-gold',
    supported_changelly: false
  },
  {
    id: 'golos',
    symbol: 'GOLOS',
    name: 'Golos',
    is_erc20: false,
    raise: 462000,
    total_amount_of_tokens: '',
    amount_sold_in_ico: 27072000,
    start_date: '11/1/2016',
    eth_price_at_launch: 10.94,
    btc_price_at_launch: 659.56,
    ico_end_date: '2016-12-04',
    ticker: 'golos',
    supported_changelly: true
  },
  {
    id: 'storj',
    symbol: 'SJCX',
    name: 'Storj',
    is_erc20: false,
    raise: 461802,
    total_amount_of_tokens: '500,000,000',
    amount_sold_in_ico: 51173144,
    start_date: '7/18/2014',
    ico_end_date: '2014-08-18',
    eth_price_at_launch: 0.3,
    btc_price_at_launch: 457,
    ticker: 'storjcoin-x',
    supported_changelly: false,
    icon_ext: 'svg'
  },
  {
    id: 'nexium',
    symbol: 'NXC',
    name: 'Beyond the Void',
    is_erc20: false,
    raise: 115500,
    total_amount_of_tokens: '66,521,587',
    amount_sold_in_ico: 28904984,
    start_date: '11/1/2016',
    ico_end_date: '2016-11-30',
    eth_price_at_launch: 10.94,
    btc_price_at_launch: 659.56,
    ticker: 'nexium',
    supported_changelly: false
  },
  {
    id: 'tokes',
    symbol: 'TKS',
    name: 'Tokes',
    is_erc20: false,
    raise: 81100,
    total_amount_of_tokens: '50,000,000',
    amount_sold_in_ico: 647624,
    start_date: '12/2/2016',
    ico_end_date: '2017-01-16',
    eth_price_at_launch: 8.4,
    btc_price_at_launch: 729.976,
    ticker: 'tokes',
    supported_changelly: false
  },
  {
    id: 'aragon',
    symbol: 'ANT',
    name: 'Aragon',
    is_erc20: true,
    contract_address: '0x960b236A07cf122663c4303350609A66A7B288C0',
    raise: 24750000,
    total_amount_of_tokens: 39609523,
    amount_sold_in_ico: 27000000,
    eth_price_at_launch: 96.20,
    btc_price_at_launch: 1813.23,
    start_date: '05/17/2017',
    ico_end_date: '2017-06-16',
    ticker: 'aragon',
    supported_changelly: true
  },
  {
    id: 'spectrecoin',
    symbol: 'XSPEC',
    name: 'Spectrecoin',
    is_erc20: false,
    raise: 15427,
    total_amount_of_tokens: 20316079,
    amount_sold_in_ico: 19000000,
    start_date: '11/20/2016',
    ico_end_date: '2017-01-08',
    eth_price_at_launch: 9.67,
    btc_price_at_launch: 688.68,
    ticker: 'spectrecoin',
    supported_changelly: false
  },
  {
  /**
   * Sources:
   * GDAX
   * https://etherscan.io/token/district0x
   *https://blog.district0x.io/district0x-network-fundraiser-recap-d0437c939bc1
   *https://blog.district0x.io/district0x-network-contribution-period-faq-57cc3455ceda
   */
  id: 'district0x',
  name: 'district0x',
  symbol: 'DNT',
  ticker: 'district0x',
  eth_price_at_launch: 234.03, /*15:00 July 18 on GDAX ETH/USD*/
  btc_price_at_launch: 2349.87, /*15:00 July 18 on GDAX BTC/USD*/
  raise: 10102951.0641, /*see below x 234.03*/
  amount_sold_in_ico: 600000000,
  start_date: '07/18/2017',
  supported_changelly: false,
  is_erc20: true,
  // Below keys are optional but recommended
  contract_address: '0x0AbdAce70D3790235af448C88547603b945604ea', /*https://etherscan.io/token/district0x*/
  raise_by_currency: {
    eth: 43169.47, /*https://blog.district0x.io/district0x-network-fundraiser-recap-d0437c939bc1*/
    btc: 0
  }
},
{
    name: 'Neo',
    symbol: 'NEO',
    is_erc20: false,
    raise: 556500, // 2100 BTC @ $265 per BTC
    total_amount_of_tokens: '',
    amount_sold_in_ico: 17500000,
    start_date: '10/01/2015',
    eth_price_at_launch: 12.16,
    btc_price_at_launch: 579.653,
    tokens_sold_at_launch: 17500000,
    raised: 541800,
    ticker: 'neo',
    id: 'neo',
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * Wagerr CEO
     */
    id: 'wagerr',
    symbol: 'WGR',
    is_erc20: false,
    name: 'Wagerr',
    ticker:'wagerr',
    eth_price_at_launch: 273.12,
    btc_price_at_launch: 2445.73,
    raise: 11000000,
    amount_sold_in_ico: 170000000,
    start_date: '07/01/2017',
    supported_changelly: false,
    icon_ext: 'svg'
  },
  {
    /**
     * Sources:
     * https://tokensale.civic.com/
     * https://cointelegraph.com/news/33-mln-civic-ico-rations-tokens-to-cope-with-unprecedented-demand
     */
    id: 'civic',
    name: 'Civic',
    symbol: 'CVC',
    ticker: 'civic',
    is_erc20: true,
    contract_address: '0x41e5560054824eA6B0732E656E3Ad64E20e94E45',
    eth_price_at_launch: 253.49,
    btc_price_at_launch: 2556.94,
    raise: 33000000,
    amount_sold_in_ico: 330000000,
    start_date: '07/06/2017',
    supported_changelly: true,
    icon_ext: 'svg'
  },
  {
    /**
     * Sources:
     * https://www.smithandcrown.com/sale/nimiq/
     */
    id: 'nimiq',
    name: 'Nimiq',
    symbol: 'NET',
    ticker: 'nimiq',
    is_erc20: false,
    eth_price_at_launch: 304,
    btc_price_at_launch: 2486,
    raise: 10787761,
    amount_sold_in_ico: 10500000,
    start_date: '06/28/2017',
    supported_changelly: false
  },
  {
    /**
     * Source:
     * Team member
     */
    id: 'fucktoken',
    name: 'Fuck',
    symbol: 'FUCK',
    ticker: 'fucktoken',
    is_erc20: true,
    contract_address: '0xE9C417EaE5E9be4A4837b844795F67F9681Df69f',
    start_date: '07/13/2017',
    eth_price_at_launch: 200.4,
    btc_price_at_launch: 2277.36,
    raise: 80000,
    amount_sold_in_ico: 20000000,
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * Populous team
     */
    id: 'populous',
    name: 'Populous',
    symbol: 'PPT',
    ticker: 'populous',
    is_erc20: true,
    contract_address: '0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a',
    start_date: '06/24/2017',
    eth_price_at_launch: 290.47,
    btc_price_at_launch: 2523.02,
    raise: 10000000,
    amount_sold_in_ico: 35998518,
    supported_changelly: false
  },
  {
    /**
     * Sources:
     * https://www.wikiwand.com/en/Nxt
     */
    id: 'nxt',
    name: 'NXT',
    symbol: 'NXT',
    ticker: 'nxt',
    is_erc20: false,
    start_date: '09/28/2013',
    eth_price_at_launch: 0.3,
    btc_price_at_launch: 134.69,
    raise: 16800,
    amount_sold_in_ico: 1000000000,
    supported_changelly: true
  },
  {
    /**
     * Sources:
     * https://cdn.omise.co/omg/crowdsaledoc.pdf
     */
    id: 'omisego',
    name: 'OmiseGO',
    symbol: 'OMG',
    ticker: 'omisego',
    is_erc20: true,
    contract_address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    start_date: '07/15/2017',
    eth_price_at_launch: 155.2,
    btc_price_at_launch: 1972.3,
    raise: 24000000,
    amount_sold_in_ico: 98312024,
    supported_changelly: false,
    icon_ext: 'svg'
  },
  {
    /**
     * Sources:
     * https://bittrex.com/Market/Index?MarketName=BTC-MTL
     * https://blog.metalpay.com/metal-token-mtl-is-being-distributed/
     * https://www.metalpay.com/assets/pdf/whitepaper.pdf
     */
    id: 'metalpay',
    name: 'Metal',
    symbol: 'MTL',
    ticker: 'metal',
    is_erc20: true,
    contract_address: '0xF433089366899D83a9f26A773D59ec7eCF30355e',
    start_date: '03/01/2017',
    eth_price_at_launch: 17.3,
    btc_price_at_launch: 1228.71,
    raise: 3795999,
    amount_sold_in_ico: 21088888,
    supported_changelly: false,
    icon_ext: 'svg'
  },
  {
    /**
     * Sources:
     * http://bitcoinist.com/tenx-ico-raises-34-million-7-minutes/
     * https://www.smithandcrown.com/sale/tenx/
     */
    id: 'tenx',
    name: 'TenX',
    symbol: 'PAY',
    ticker: 'tenx',
    is_erc20: true,
    contract_address: '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280',
    start_date: '06/24/2017',
    eth_price_at_launch: 290.47,
    btc_price_at_launch: 2523.02,
    raise: 83110818,
    amount_sold_in_ico: 104661310.533697,
    supported_changelly: true,
    raise_by_currency: {
      eth: 200000
    }
  },
  {
    /**
     * Sources:
     * https://steemit.com/cryptocurrency/@bcn/coindash-ico-today
     */
    id: 'coindash',
    name: 'Coindash',
    symbol: 'CDT',
    ticker: 'coindash',
    is_erc20: true,
    contract_address: '0x177d39ac676ed1c67a2b268ad7f1e58826e5b0af',
    start_date: '07/17/2017',
    eth_price_at_launch: 188.72,
    btc_price_at_launch: 2217,
    raise: 15097600,
    amount_sold_in_ico: 487500000,
    raise_by_currency: {
      eth: 80000
    }
  },
  {
    /**
     * Sources:
     * https://0xproject.com/token
     */
    id: '0x',
    name: '0x',
    symbol: 'ZRX',
    ticker: '0x',
    is_erc20: true,
    contract_address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    start_date: '08/15/2017',
    eth_price_at_launch: 286.65,
    btc_price_at_launch: 4170.8,
    raise: 24000000,
    amount_sold_in_ico: 500000000
  }
];
