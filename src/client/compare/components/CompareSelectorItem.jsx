// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import compare from '~/compare';

type Props = {
  ticker: string,
  onRemove: Function,
  color: string,
  classes: Object
};

const CompareSelectorItem = ({ classes, ticker, onRemove, color }: Props) => (
  <div className={classes.container}>
    <div className={classes.dot} style={{ background: color }} />
    <div className={classes.label}>{ticker}</div>
    <i
      onClick={() => onRemove(ticker)}
      className={classNames('material-icons', classes.close)}
    >close</i>
  </div>
);

const styles = {
  container: {
    width: '160px',
    height: '40px',
    border: '1px solid hsl(220, 8%, 50%)',
    fontSize: '11px',
    color: 'hsl(225, 7%, 79%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '5px',
    marginRight: '20px',
    marginBottom: '15px'
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '100%',
    background: 'hsl(0, 100%, 50%)',
    marginLeft: '15px',
    flex: '0 0 7px'
  },
  label: {
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'pre',
    textOverflow: 'ellipsis',
    margin: '0 15px',
    flexGrow: 2
  },
  close: {
    fontSize: '12px',
    color: 'hsl(225, 7%, 49%)',
    marginRight: '10px',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(225, 7%, 70%)',
    }
  }
};
const styled = injectSheet(styles)(CompareSelectorItem);

const mapDispatchToProps = dispatch => ({
  onRemove: ticker => dispatch(compare.actions.removeTicker(ticker))
});

export default connect(null, mapDispatchToProps)(styled);
