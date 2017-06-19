// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { changePageNumber } from '../actions';

type Props = {
  classes: Object,
  max: number,
  current: number,
  onChange: number => void
};

function Paginator({ classes, max, current, onChange }: Props) {
  return (
    <div className={classes.container}>
      <i
        className="material-icons"
        onClick={() => {
          const prev = (current === 1) ? max : (current - 1);

          onChange(prev);
        }}
      >chevron_left</i>
      Page {current}/{max}
      <i
        className="material-icons"
        onClick={() => {
          const next = (current === max) ? 0 : (current + 1);

          onChange(next);
        }}
      >chevron_right</i>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 22px',
    justifyContent: 'space-between',
    width: '100%',
    background: 'hsla(0, 0%, 0%, 0.1)',
    color: 'hsla(0, 0%, 100%, 0.4)',
    fontSize: '11px',
    padding: '0px 15px',
    '& > .material-icons': {
      fontSize: '17px',
      cursor: 'pointer'
    }
  },
};

const withStyles = injectSheet(styles)(Paginator);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  current: state.rankings.pageNumber
});
const mapDispatchToProps = (dispatch: $FlowTODO) => ({
  onChange: nextPage => dispatch(changePageNumber(nextPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles);
