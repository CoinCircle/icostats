// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Modal from '~/app/components/Modal';
import getColumns from '../lib/getColumns';
import { selectRelative, selectAbsolute } from '../actions';

type Props = {
  sortBy: string,
  ascending: boolean,
  onSort: Function,
  view: string,
  classes: Object,
  onClickAbsolute: Function,
  onClickRelative: Function,
  isAbsolute: boolean
}

class TableHeader extends React.Component {
  props: Props;
  state = {
    isModalOpen: false,
    isAbsolute: false
  };

  renderAbsDiff() {
    const { classes: c, view, isAbsolute } = this.props;

    return (
      <div className={c.absDelta}>
        <div
          onClick={() => this.props.onClickAbsolute(view)}
          className={classNames(c.absDeltaItem, isAbsolute && 'is-active')}
        >
          Abs
        </div>
        <div style={{ margin: '0 6px' }}>|</div>
        <div
          onClick={() => this.props.onClickRelative(view)}
          className={classNames(c.absDeltaItem, !isAbsolute && 'is-active')}
        >
          Rel
        </div>
      </div>
    );
  }

  render() {
    const {
      classes,
      sortBy,
      onSort,
      ascending,
      view,
      isAbsolute
    } = this.props;
    const onClickHint = () => this.setState({ isModalOpen: true });
    const sortedCell = item => (
      <span
        className={classes.sortActive}
        onClick={() => onSort(
          item.key,
          (sortBy === item.key) ? !ascending : ascending
        )}
      >
        {item.label}
        <i
          className={classNames('material-icons', classes.caret)}
        >
          {ascending ? 'arrow_drop_up' : 'arrow_drop_down'}
        </i>
      </span>
    );
    const Cell = ({ item }) => (
      <div
        className={classNames(classes.th, item.addClass)}
      >
        {(sortBy === item.key) && sortedCell(item)}
        {(sortBy !== item.key) &&
          <span
            className={classes.label}
            onClick={() => onSort(
              item.key,
              (sortBy === item.key) ? !ascending : ascending
            )}
          >
            {item.label}
          </span>
        }
        {item.extra}
        {/roi_vs_(eth|btc)/.test(item.key) && this.renderAbsDiff()}
      </div>
    );

    return (
      <div className={classes.tableheader}>
        <div className={classNames(classes.th, classes.thLogo)} />
        {getColumns(view, classes, onClickHint).map(item =>
          <Cell key={item.key} item={item} />
        )}
        {this.state.isModalOpen &&
          <Modal
            title="How is ICO Price Determined?"
            onClose={() => this.setState({ isModalOpen: false })}
          >
            <p className={classes.helpText}>
              ICO price is calculated according to the following formula:
              <pre>
                (USD raised in ICO) / (# of tokens sold in ICO)
              </pre>
              <br />
              You can hover over the ICO price of any listing to see these
              values.
            </p>
          </Modal>
        }
      </div>
    );
  }
}

const styles = {
  tableheader: {
    display: 'flex',
    width: '180%',
    flex: '0 0 30px',
    minHeight: '20px',
    background: 'hsl(222, 21%, 25%)'
  },
  th: {
    flexGrow: '1',
    width: '100%',
    color: 'hsl(256, 70%, 68%)',
    fontSize: '11px',
    textTransform: 'uppercase',
    textAlign: 'right',
    position: 'relative',
    margin: '0px 10px',
    order: 1
  },
  thLogo: {
    width: '60%',
    order: 0
  },
  thSmall: {
    width: '80%'
  },
  thPrimary: {
    width: '140%',
    order: 0
  },
  thName: {
    width: '100%',
    order: 0
  },
  thDate: {
    width: '100%'
  },
  sortActive: {
    background: 'hsl(256, 61%, 48%)',
    borderRadius: '2px',
    position: 'absolute',
    top: '-1px',
    right: '0px',
    padding: '3px 6px 3px 20px',
    cursor: 'pointer',
    color: 'hsl(256, 81%, 85%)',
    maxWidth: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      background: 'hsl(256, 61%, 52%)',
    }
  },
  label: {
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(256, 98%, 79%)'
    }
  },
  caret: {
    fontSize: '18px',
    verticalAlign: '-5px',
    position: 'absolute',
    top: '1px',
    left: '2px'
  },
  help: {
    top: '0px',
    right: '-17px',
    position: 'absolute',
    fontSize: '14px',
    cursor: 'pointer'
  },
  helpTitle: {
    margin: '10px 0 22px'
  },
  helpText: {
    fontSize: '13px',
    fontWeight: '400',
    color: 'hsl(0, 0%, 30%)',
    margin: '0 30px'
  },
  absDelta: {
    position: 'absolute',
    top: '-17px',
    right: '0',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '10px',
    color: 'hsl(0, 0%, 100%)',
    fontWeight: '300'
  },
  absDeltaItem: {
    cursor: 'pointer',
    '&.is-active': {
      color: 'hsl(200, 90%, 50%)',
      fontWeight: '700'
    }
  },
  '@media (min-width: 768px)': {
    tableheader: {
      margin: '0 15px',
      width: 'auto'
    }
  },
  '@media (min-width: 1024px)': {
    th: {
      fontSize: '13px'
    },
    thLogo: {
      width: '70%'
    }
  }
};

const styled = injectSheet(styles)(TableHeader);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  isAbsolute: state.rankings.ROICalcType === 'ABSOLUTE'
});
const mapDispatchToProps = dispatch => ({
  onClickAbsolute: view => dispatch(selectAbsolute(view)),
  onClickRelative: view => dispatch(selectRelative(view))
});

export default connect(mapStateToProps, mapDispatchToProps)(styled);
