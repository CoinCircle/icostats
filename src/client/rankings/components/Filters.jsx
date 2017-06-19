// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setFilters } from '../actions';

type Props = {
  classes: Object,
  filters: $FlowTODO,
  onChange: (newVal: Object) => void
};

function Filters({ classes, filters, onChange }: Props) {
  const erc20Checkbox = (
    <div className={classes.checkWrapper}>
      <input
        name="filter-erc20"
        className={classes.checkInput}
        type="checkbox"
      />
      <label
        className={classes.check}
        htmlFor="filter-erc20"
      />
      {filters.erc20 &&
        <i className={classNames('material-icons', classes.checkIcon)}>check</i>
      }
    </div>
  );
  const erc20 = (
    <div
      className={classes.erc20}
      onClick={() => onChange({
        ...filters,
        erc20: !filters.erc20
      })}
    >
      {erc20Checkbox}
      <span className={classes.label}>
        ERC-20 Only
      </span>
    </div>
  );
  const title = (
    <h3 className={classes.title}>Filters:</h3>
  );

  return (
    <div className={classes.container}>
      {title}
      {erc20}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px'
  },
  title: {
    color: 'hsl(0, 0%, 100%)',
    fontWeight: '200',
    fontSize: '13px',
    paddingRight: '6px',
    margin: 0
  },
  erc20: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
    cursor: 'pointer'
  },
  checkWrapper: {
    display: 'inline-block',
    width: '13px',
    height: '13px',
    position: 'relative',
    top: '1px'
  },
  label: {
    color: 'white',
    fontSize: '13px',
    paddingLeft: '5px',
    fontWeight: '200'
  },
  check: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: '1px solid hsl(120, 35%, 47%)',
    borderRadius: '3px'
  },
  checkInput: {
    visibility: 'hidden'
  },
  checkIcon: {
    position: 'absolute',
    fontSize: '7px',
    top: '3px',
    left: '3px',
    color: 'hsl(120, 72%, 64%)',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(120, 72%, 69%)'
    }
  }
};

const withStyles = injectSheet(styles)(Filters);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  filters: state.rankings.filters
});
const mapDispatchToProps = (dispatch: $FlowTODO) => ({
  onChange: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles);
