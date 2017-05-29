import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import * as types from './constants';

const propTypes = {
  sortBy: PropTypes.string,
  ascending: PropTypes.bool,
  onSort: PropTypes.func.isRequired,
  type: PropTypes.string
};

const Header = ({ classes, sortBy, onSort, ascending, type = 'ROI_TOTAL', currency }) => {
  const items = [{
    key: 'name',
    label: 'Name',
    addClass: classes.thName
  }, {
    key: 'start_date',
    label: 'ICO Date',
    addClass: classes.thDate
  }, {
    key: 'ico_price',
    label: 'ICO Price',
    addClass: classes.thPrice
  }, {
    key: 'current_price',
    label: 'Curr. Price',
    addClass: classes.thPrice
  }];

  switch (type) {
    case types.ROI_OVER_TIME: {
      items.push({
        key: 'roi_per_day',
        label: 'Daily ROI',
        addClass: [classes.thPrimary, classes.hideMobile]
      });
      items.push({
        key: 'roi_per_week',
        label: 'Weekly ROI',
        addClass: [classes.thPrimary, classes.hideMobile]
      });
      items.push({
        key: 'roi_per_month',
        label: 'Monthly ROI',
        addClass: classes.thPrimary
      });
      break;
    }
    case types.ROI_VS_ETH: {
      items.push({
        key: 'roi_since_ico',
        label: 'ROI since ICO',
        addClass: classes.thPrimary
      });
      items.push({
        key: 'eth_roi_during_period',
        label: 'ETH ROI since ICO',
        addClass: classes.thPrimary
      });
      items.push({
        key: 'roi_vs_eth',
        label: 'ROI vs ETH',
        addClass: classes.thPrimary
      });
      break;
    }
    case types.ROI_VS_BTC: {
      items.push({
        key: 'roi_since_ico',
        label: 'ROI since ICO',
        addClass: classes.thPrimary
      });
      items.push({
        key: 'btc_roi_during_period',
        label: 'BTC ROI since ICO',
        addClass: classes.thPrimary
      });
      items.push({
        key: 'roi_vs_btc',
        label: 'ROI vs BTC',
        addClass: classes.thPrimary
      });
      break;
    }
    default: {
      items.push({
        key: 'roi_since_ico',
        label: 'Change (%)',
        addClass: classes.thPrimary
      });
    }
  }

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
    </div>
  );

  return (
    <div className={classes.tableheader}>
      <div className={classNames(classes.th, classes.thLogo)} />
      {items.map(item =>
        <Cell key={item.key} item={item} />
      )}
    </div>
  );
};

Header.propTypes = propTypes;

const styles = {
  tableheader: {
    display: 'flex',
    width: '179%',
    marginLeft: '1%', // prevent covering up shadow on left side
    flex: '0 0 30px',
    minHeight: '20px',
    background: 'hsl(222, 21%, 25%)'
  },
  th: {
    flexGrow: '1',
    width: '100%',
    color: '#8F6CF0',
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
    whiteSpace: 'pre',
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
  '@media (min-width: 768px)': {
    tableheader: {
      width: '99%',
      boxShadow: 'none'
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

export default injectSheet(styles)(Header);
