import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const propTypes = {
  sortBy: PropTypes.string,
  ascending: PropTypes.bool,
  onSort: PropTypes.func.isRequired
};

const Header = ({ classes, sortBy, onSort, ascending }) => {
  const items = [{
    key: 'symbol',
    label: 'Symbol',
    addClass: classes.thSmall
  }, {
    key: 'start_date',
    label: 'ICO Date'
  }, {
    key: 'implied_token_price',
    label: 'ICO Price'
  }, {
    key: 'price_usd',
    label: 'Curr. Price'
  }, {
    key: 'change_since_ico',
    label: 'Change (%)',
    addClass: classes.thPrimary
  }];
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
    width: '100%',
    height: '20px',
    minHeight: '20px'
  },
  th: {
    flexGrow: '1',
    width: '100%',
    color: '#8F6CF0',
    fontSize: '12px',
    textTransform: 'uppercase',
    textAlign: 'right',
    position: 'relative',
  },
  thLogo: {
    width: '70%'
  },
  thSmall: {
    width: '65%'
  },
  thPrimary: {
    width: '150%'
  },
  sortActive: {
    background: 'hsl(256, 61%, 48%)',
    borderRadius: '2px',
    position: 'absolute',
    top: '-2px',
    right: '-15px',
    padding: '3px 20px 3px 15px',
    cursor: 'pointer',
    color: 'hsl(256, 81%, 85%)',
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
    top: '2px',
    right: '2px'
  }
};

export default injectSheet(styles)(Header);
