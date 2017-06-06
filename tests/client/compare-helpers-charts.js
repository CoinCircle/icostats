/* eslint-disable */
import { expect, assert } from 'chai';
import { generateLineChartData, roundToDays } from 'client/compare/helpers/charts';

describe('generateDatasets', function () {
  before(function() {
    const prices = [
      {
        ticker: 'humaniq',
        price_usd: [
          [1494000000000, 1.0],
          [1495000000000, 2.0],
          [1496000000000, 1.5],
          [1497000000000, 1.7],
          [1498000000000, 1.7],
        ]
      },
      {
        ticker: 'golem',
        price_usd: [
          [1494000000000, 1.5],
          [1495000000000, 3.0],
          [1496000000000, 3.5],
          [1497000000000, 1.7],
          [1498000000000, 3.7],
        ]
      },
    ];
    const colors = ['hsl(0, 50%, 50%)', 'hsl(260, 50%, 50%)'];
    // Expectation:
    // data = {
    //  labels: [
    //    1494000000000,
    //    1495000000000,
    //    1496000000000,
    //    1497000000000,
    //    1498000000000,
    //  ],
    //  datasets: [
    //    {
    //      label: 'humaniq',
    //      data: [1.0, 2.0, 1.5, 1.7, 1.7],
    //      borderColor: 'hsl(0, 50%, 50%)'
    //    },
    //    {
    //      label: 'golem',
    //      data: [1.5, 3.0, 3.5, 1.7, 3.7],
    //      borderColor: 'hsl(260, 50%, 50%)'
    //    }
    //
    //  ]
    // }
    this.actual = generateLineChartData(prices, colors);
  });

  it('returns the same number of labels as the number of dates', function () {
    const { labels, datasets } = this.actual;

    expect(labels.length).to.equal(5);
  });

  it('returns the labels (timestamps) in increasing order', function () {
    const { labels } = this.actual;
    const sorted = labels.slice().sort();

    expect(labels.toString()).to.equal(sorted.toString());
  });

  it('returns the correct format for datasets', function () {
    const { datasets } = this.actual;
    const dataset = datasets[0];

    assert(dataset.hasOwnProperty('label'));
    assert(dataset.hasOwnProperty('data'));
    assert(dataset.hasOwnProperty('borderColor'))
    assert(Array.isArray(dataset.data));
  });

  it('returns the right data', function () {
    const prices = [
      {
        ticker: 'humaniq',
        price_usd: [
          [1494000000000, 1.0],
          [1495000000000, 2.0],
          [1496000000000, 1.5],
          [1497000000000, 1.7],
          [1498000000000, 1.7],
        ]
      },
      {
        ticker: 'golem',
        price_usd: [
          [1494000000000, 1],
          [1495000000000, 3.0],
          [1496000000000, 3.5],
          [1497000000000, 1.7],
          [1498000000000, 3.7],
        ]
      },
    ];
    const icos = [
      {
        ticker: 'golem',
        implied_token_price: 1.0
      },
      {
        ticker: 'humaniq',
        implied_token_price: 3.5
      }
    ]
    const colors = ['hsl(0, 50%, 50%)', 'hsl(260, 50%, 50%)'];
    const actual = generateLineChartData(prices, colors, icos);
    const { labels, datasets } = actual;
    const golem = datasets.find(d => d.label === 'golem');

    expect(golem.data.length).to.equal(5);
    expect(golem.data[0]).to.equal(0);
    expect(golem.data[4]).to.equal(2.7);
  });

  it('returns the right data with differing time scales', function () {
    const prices = [
      {
        ticker: 'humaniq',
        price_usd: [
          [1494000000000, 1.0],
          [1495000000000, 2.0],
          [1496000000000, 1.5],
          [1497000000000, 1.7],
          [1498000000000, 1.7],
        ]
      },
      {
        ticker: 'golem',
        price_usd: [
          [1491000000000, 1.5],
          [1492000000000, 3.0],
          [1493000000000, 3.5],
          [1494000000000, 1.5],
          [1495000000000, 3.0],
          [1496000000000, 3.5],
          [1497000000000, 1.7],
          [1498000000000, 3.7],
        ]
      },
    ];
    const colors = ['hsl(0, 50%, 50%)', 'hsl(260, 50%, 50%)'];
    const actual = generateLineChartData(prices, colors);
    const { labels, datasets } = actual;
    const humaniq = datasets.find(d => d.label === 'humaniq');
    // Expectation
    // {
    //
    // }

    expect(humaniq.data[0]).to.be.null;
    expect(humaniq.data.length).to.equal(8);

  });
  it('rounds to days', function () {
    // const ONE_DAY = 1000 * 60 * 60 * 24;
    // const prices = [
    //   {
    //     ticker: 'humaniq',
    //     price_usd: [
    //       [1494000000000, 1.0],
    //       [1494043200000, 2.0],
    //       [1494086400000, 1.5],
    //       [1494129600000, 1.7],
    //       [1494172800000, 1.7],
    //     ]
    //   },
    //   {
    //     ticker: 'golem',
    //     price_usd: [
    //       [1493913600000, 0.5],
    //       [1493956800000, 0.7],
    //       [1494000000000, 1.0],
    //       [1494043200000, 2.0],
    //       [1494086400000, 1.5],
    //       [1494129600000, 1.7],
    //       [1494172800000, 1.7],
    //     ]
    //   }
    // ];
    const timestamps = [
      1493913600000,
      1493956800000,
      1494000000000,
      1494043200000,
      1494086400000,
      1494129600000,
      1494172800000,
    ];
    const expected = [
      1493913600000,
      1494000000000,
      1494086400000,
      1494172800000,
    ];
    const actual = roundToDays(timestamps);

    expect(actual.toString()).to.equal(expected.toString());
  });
  // * It filters out time periods that not all items contain if it is beyond
  //   the max time
  //
  // it(
  //   'aligns returned data such that items with the same indexes contain the same timestamps'
  //   , function () {
  //     const prices = [
  //       {
  //         ticker: 'humaniq',
  //         price_usd: [
  //           [1494000000000, 1.0],
  //           [1495000000000, 2.0],
  //           [1496000000000, 1.5],
  //           [1497000000000, 1.7],
  //           [1498000000000, 1.7],
  //         ]
  //       },
  //       {
  //         ticker: 'humaniq',
  //         price_usd: [
  //           [1491000000000, 1.0],
  //           [1492000000000, 1.0],
  //           [1493000000000, 1.0],
  //           [1494000000000, 1.0],
  //           [1495000000000, 2.0],
  //           [1496000000000, 1.5],
  //           [1497000000000, 1.7],
  //           [1498000000000, 1.7],
  //         ]
  //       },
  //     ]
  // });
});
