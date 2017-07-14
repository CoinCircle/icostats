## Adding Tokens

If you'd like to have a token added, you can create a pull request to add it
without much programming skills. It should be accepted if it meets the following
conditions:

* The ICO is closed and no longer accepting contributions.
* The token must be trading on an exchange.
* It is listed on [coinmarketcap](https://coinmarketcap.com)
* You add comments which cite sources where the data can be verified.

## How to Add a Token

#### 1. Add data

The tokens which are listed are defined in `src/server/lib/ico-data.js`. It is
just an array of objects, where each object is a token defition. To add a token,
you just add an object to this array. Below is an example of a valid token:

```
{
  /**
   * Sources:
   * http://foo.com/bar
   * http://qux.com/baz
   */
  id: 'eos',
  name: 'EOS',
  symbol: 'EOS',
  ticker: 'eos',
  eth_price_at_launch: 262.38,
  btc_price_at_launch: 2508.52,
  raise: 185000000,
  amount_sold_in_ico: 200000000,
  start_date: '06/26/2017',
  supported_changelly: false,
  is_erc20: true,
  // Below keys are optional but recommended
  contract_address: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
  raise_by_currency: {
    eth: 19303,
    btc: 1839
  }
},
```

The first thing you'll noticed is a comment with source links. You must cite
your sources here otherwise the PR will probably be rejected.

Below are descriptions of the *required* data. You must provide these values.

| Key                   | Type      | Value                                    |
|-----------------------|-----------|------------------------------------------|
| `id`                  | string    | Up to you to choose this value. It must be unique so make sure no other item uses the same ID. The filename of the logo which you will add later needs to match this ID. |
| `name`                | string    | Name of the ICO. (e.g. 'Humaniq', 'Bancor', etc) |
| `symbol`              | string    | Token Symbol (e.g. 'ETH', 'GNT', ...) |
| `ticker`              | string    | The ID for this asset in coinmarketcap's API. To find this, go to the token's detail page in coinmarketcap. The correct value is in the URL of the page. For example, if you go to the firstblood page the URL is like this: `https://coinmarketcap.com/assets/firstblood/`. The last part is the ID. so for First Bloog, you would user `ticker: 'firstblood'` |
| `eth_price_at_launch` | number    | The price of ETH when the ICO started. A good way to find this is on cryptowatch. Use GDAX for the price, unless the token launched before GDAX supported ETH. In this case, kraken is recommended since they have been trading ETH for a lot longer than most other exchanges. |
| `btc_price_at_launch` | number    | The price of BTC when the ICO started. Same thing as eth_price_at_launch but for btc. |
| `raise`               | number    | The USD raised. Most ICO's raise via ETH and/or BTC, so the recommended way to get this is by finding out how much ETH/BTC was raised, and using the prices you just got for eth/btc on launch date and multiply. `raise = (eth_price_at_launch * eth_raised) + (btc_price_at_launch * btc_raised)` |
| `amount_sold_in_ico`  | number    | The total number of tokens sold in ICO. |
| `start_date`          | string    | ICO Start date in 'MM/DD/YYYY' format. |
| `supported_changelly` | boolean   | Go to changelly.com and check if they support the token. If they do, put `true`. Otherwise put `false`. |
| `is_erc20`            | boolean   | `true` if the token is ERC-20 compliant. To check this, get the token contract address and look it up [here](https://etherscan.io/token-search). If it shows up, it's ERC-20 compliant. |

The following keys are optional. If possible, please try to include them as they
will make new features easier to implement in the future:

| Key                   | Type      | Value                                    |
|-----------------------|-----------|------------------------------------------|
| `contract_address`    | string    | Contract address for ethereum-based tokens. This is the same address you use to check if the token is ERC-20 compliant. |
| `raise_by_currency`   | Object    | Object which maps currencies accepted in the ICO to the amount raised in that respective currency. Usually you end up getting this info to calculate the raise. |
| `icon_ext`            | string    | If the logo is in a format besides .png, define it here. So, if you add a .svg logo, it should be `icon_ext: 'svg'`. |

Once you've added this to the file, save it and do one last step.

#### 2. Add the logo

You must add a logo to `public/img/logos`. The filename must match the `id` of
the ICO you added. So for the above example using 'eos' as the is, the image
should be named `eos.png`. If the logo is a format besides PNG, you must define
the correct extension at `icon_ext`.

Please make sure to resize all images to 60px wide or less. Once you've done
that, compress them on [compresspng](http://compresspng.com/) to optimize the
file size.


#### 3. Don't forget to site your sources!

Other people will rely on this data, and we must maintain the accuracy of the
data. So please be diligent about citing all your sources!

#### 4. Open a PR

Once you've completed the two steps above, you're done! Open a pull request and
it will be merged and deployed after we verify that the data is not invalid.
