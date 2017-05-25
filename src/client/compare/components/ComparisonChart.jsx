// @flow
import type { Price } from '~/compare/helpers/charts';
import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import injectSheet from 'react-jss';
import { generateLineChartData } from '~/compare/helpers/charts';
import Loading from './ComparisonChartLoading';

type Props = {
  prices: Array<Price>,
  classes: Object,
  colors: Array<String>,
  tickers: Array<String>,
  isFetching: Boolean
};

Chart.defaults.global.defaultFontColor = '#767D8B';
Chart.defaults.global.defaultFontFamily = 'Montserrat';
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontStyle = 'normal';
Chart.defaults.global.elements.backgroundColor =  'rgba(255, 206, 86, 1)';

 class ComparisonChart extends React.Component {
   props: Props;
   canvas: HTMLCanvasElement;
   chart: Object;

  //  componentWillReceiveProps(nextProps) {
  //    if (this.props.tickers.slice().sort().toString() !== nextProps.tickers.slice().sort().toString()) {
  //      this.chart.destroy();
  //      this.renderChart(nextProps);
  //    }
  //  }

   renderChart (ctx) {
     if (!ctx) {
       return;
     }
     const { prices, colors } = this.props;
     const data = generateLineChartData(prices, colors);
     const options = {
       showLines: true,
       spanGaps: false,
       responsive: true,
       legend: {
         display: false
       },
       scales: {
         yAxes: [{
           scaleLabel: {
             display: true,
             labelString: 'Price (USD)',
             fontColor: '#FFFFFF'
           },
           gridLines: {
             color: '#767D8B',
             backgroundColor: '#767D8B',
             drawBorder: false,
             borderDash: [1, 4]
           }
         }],
         xAxes: [{
           scaleLabel: {
             display: true,
             labelString: 'Date',
             fontColor: '#FFFFFF'
           },
           gridLines: {
             display: false
           }
         }]
       }
     };
     this.chart = new Chart(ctx, {
       type: 'line',
       data,
       options
     });
   }

   render() {
     const { classes: c, isFetching } = this.props;

     if (isFetching) {
       return <div className={c.loadingWrapper}><Loading /></div>;
     }

     return (
       <div className={c.container}>
         <canvas
           width="500"
           height="300"
           ref={this.renderChart.bind(this)}
         />
       </div>
     );
   }
 }

/* =============================================================================
 =  GraphQL: Get Data
============================================================================= */
const QUERY = gql`
query getprices($tickers: [String!]) {
  prices(tickers: $tickers) {
    ticker
    price_usd
  }
  icos {
    ticker
    name
  }
}
`;
const mapDataToProps = result => ({
  prices: result.data.prices,
  icos: result.data.icos,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  options: ({ tickers }) => ({ variables: { tickers }}),
  props: mapDataToProps
})(ComparisonChart);


/* =============================================================================
 =    Redux
============================================================================= */
const mapStateToProps = state => ({
  tickers: state.compare.tickers
});
const container = connect(mapStateToProps)(withData);

const styles = {
  container: {
    marginTop: '40px'
  },
  loadingWrapper: {
    marginTop: '100px',
    width: '80%',
    margin: '0 auto'
  }
};

export default injectSheet(styles)(container);
