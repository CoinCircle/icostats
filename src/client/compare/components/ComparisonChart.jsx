// @flow
import type { Price } from '~/compare/helpers/charts';
import React from 'react';
import Chart from 'chart.js';
import injectSheet from 'react-jss';
import { generateLineChartData } from '~/compare/helpers/charts';

type Props = {
  prices: Array<Price>,
  classes: Object,
  colors: Array<String>
};

 class ComparisonChart extends React.Component {
   props: Props;
   canvas: HTMLCanvasElement;
   chart: Object;


   componentDidMount() {
     const { prices, colors } = this.props;
     const ctx = this.canvas;
     const data = generateLineChartData(prices, colors);
     const options = {
       showLines: true,
       spanGaps: false,
       responsive: false
     };
     this.chart = new Chart(ctx, {
       type: 'line',
       data,
       options
     });
   }

   getChartDataSets() {
     const { prices, colors } = this.props;

     return prices.map((price, i) => ({
       label: price.ticker,
       fill: false,
       borderColor: colors[i],
       lineTension: 0.1
     }));
   }

   render() {
     const { classes: c } = this.props;

     return (
       <div className={c.container}>
         <canvas
           width="500"
           height="300"
           ref={(c) => { this.canvas = c; }}
         />
       </div>
     );
   }
 }

const styles = {
  container: {

  }
};

export default injectSheet(styles)(ComparisonChart);
