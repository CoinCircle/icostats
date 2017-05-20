import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import moment from 'moment';
import Header from './Header';
import Row from './Row';
import * as types from './constants';


const styles = {
  container: {
    padding: '15px 30px',
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto'
  },
  ico: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 900,
    fontSize: '25px',
    color: 'white',
    textTransform: 'uppercase',
    margin: '0'
  },
  header: {
    flex: '0 0 80px',
    width: '100%',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  btnFeedback: {
    background: 'hsla(0, 0%, 0%, 0)',
    border: '2px solid hsl(15, 75%, 60%)',
    fontSize: '15px',
    fontWeight: '900',
    padding: '6px 20px',
    borderRadius: '2px',
    color: 'hsl(15, 75%, 60%)',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(15, 85%, 70%)',
      borderColor: 'hsl(15, 85%, 70%)'
    }
  },
  tbody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
};


@injectSheet(styles)
class Rankings extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool,
    icos: PropTypes.array,
    match: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'change_since_ico',
      ascending: false
    };
  }

  getType() {
    const { match: { path }} = this.props;

    if (/^\/roi-over-time/.test(path)) {
      return types.ROI_OVER_TIME;
    }

    if (/^\/vs-eth/.test(path)) {
      return types.ROI_VS_ETH;
    }

    return types.ROI_TOTAL;
  }

  sort(icos) {
    const { sortBy, ascending } = this.state;

    return icos.slice().sort((a, b) => handleSort(a, b, sortBy, ascending));
  }

  renderLoading() {
    return <span>Loading...</span>;
  }

  render() {
    if (this.props.isFetching) return this.renderLoading();
    const { classes } = this.props;
    const type = this.getType();
    const titles = {
      [types.ROI_OVER_TIME]: 'ROI Over Time',
      [types.ROI_TOTAL]: 'ROI Since ICO',
      [types.ROI_VS_ETH]: 'Compare Performance to Ethereum'
    };
    const title = (
      <h3 className={classes.title}>
        {titles[type]}
      </h3>
    );
    const feedbackButton = (
      <button className={classes.btnFeedback}>Feedback</button>
    );
    const header = (
      <div className={classes.header}>
        {title}
        {feedbackButton}
      </div>
    );

    return (
      <div className={classes.container}>
        {header}
        <Header
          sortBy={this.state.sortBy}
          onSort={(sortBy, ascending) => this.setState({ sortBy, ascending })}
          ascending={this.state.ascending}
          type={type}
        />
        {this.sort(this.props.icos).map(ico =>
          <Row
            key={ico.id}
            ico={ico}
            type={type}
          />
        )}
      </div>
    );
  }
}

/* =============================================================================
=    Sort function
============================================================================= */
/**
 * Handles sorting logic for ranking.
 * @param {Object} a
 * @param {Object} b
 * @param {String} sortBy
 * @param {Boolean} ascending
 * @return {Number}
 */
function handleSort(_a, _b, sortBy, ascending) {
  let a = _a[sortBy];
  let b = _b[sortBy];

  switch (sortBy) {
    case 'name': {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) return ascending ? 1 : -1;
      if (a > b) return ascending ? -1 : 1;
      return 0;
    }
    case 'start_date': {
      const format = 'MM/DD/YYYY';
      const ma = moment(a, format);
      const mb = moment(b, format);

      if (ma < mb) return ascending ? 1 : -1;
      if (ma > mb) return ascending ? -1 : 1;
      return 0;
    }
    // Numeric values should use default
    default: {
      return ascending ? (a - b) : (b - a);
    }
  }
}

export default Rankings;
