import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Header from './Header';
import Row from './Row';
import moment from 'moment';


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
    fontSize: '30px',
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
    icos: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'change_since_ico',
      ascending: false
    };
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
    const title = (
      <h3 className={classes.title}>
        ROI Since ICO
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
        />
        {this.sort(this.props.icos).map(ico =>
          <Row
            key={ico.id}
            ico={ico}
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
    case 'symbol': {
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

      return ascending ? (ma < mb) : (mb > ma);
    }
    // Numeric values should use default
    default: {
      return ascending ? (a - b) : (b - a);
    }
  }
}

export default Rankings;
