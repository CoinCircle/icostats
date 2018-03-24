// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { openFeedback } from '../actions';
import AlertsCTA from './AlertsCTA';
import UKGBox from './UKGBox';

type Props = {
  classes: Object,
  onClickFeedback: () => void,
  isNavOpen: boolean
};

let tipjarRef;

const Navigation = ({ classes, onClickFeedback, isNavOpen = true }: Props) => (

  <div
    className={classNames(classes.container, { [classes.hide]: !isNavOpen })}
  >
    <div className={classes.brand}>
      <img src="/img/logo.svg" className={classes.logo} alt="logo" />
    </div>

    <div className={classes.menu}>
      <h3 className={classes.menuTitle}>Stats</h3>
      <NavLink
        exact
        to="/"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >直近の上昇率</NavLink>
      <NavLink
        exact
        to="/roi-since-ico"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >
        ICOからの投資収益率O
      </NavLink>
      <NavLink
        to="/roi-over-time"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >
        期間ごとの投資収益率
      </NavLink>
      <NavLink
        to="/vs-eth"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >
        ETH換算の上昇率
      </NavLink>
      <NavLink
        to="/vs-btc"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >BTC換算の上昇率</NavLink>
      <NavLink
        to="/compare"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >比較グラフ</NavLink>
      <a
        href="https://www.icoalert.com/"
        target="_blank"
        rel="noopener"
        className={classes.menuItem}
      >最新ICO情報</a>
      {/* <NavLink
        to="/token-holders"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >Token Holders</NavLink>
      <NavLink
        to="/locks"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >Locks</NavLink> */}
    </div>

    <AlertsCTA />

    <a
      className={classes.btnFeedback}
      onClick={onClickFeedback}
    >お問い合わせ</a>

    <a
      href="https://trello.com/b/UnsBjG3k"
      target="_blank"
      rel="noopener noreferrer"
      className={classes.roadmap}
    >
      Trello Roadmap
    </a>

    <div
      className={classes.tipjar}
      onClick={() => tipjarRef && selectElementText(tipjarRef, window)}
    >
      <span className={classes.tipjarTitle}>
        tipjar:{' '}
      </span>
      <pre className={classes.tipjarAddress} ref={c => tipjarRef = c}>
        icostats.eth
      </pre>
    </div>
  </div>
);

const styles = {
  container: {
    height: '100%',
    width: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    flexShrink: 0,
    boxShadow: '3px 0px 10px hsla(0, 0%, 0%, 0.5)',
    backgroundColor: 'hsl(222, 21%, 20%)',
    justifyContent: 'space-between',
    zIndex: 1,
    overflow: 'scroll'
  },
  brand: {

  },
  logo: {
    margin: '20px'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    flexShrink: 0
  },
  menuTitle: {
    fontWeight: 700,
    color: 'hsl(22, 10%, 90%)',
    fontSize: '23px',
    marginTop: '50px',
    marginBottom: '5px',
    paddingLeft: '20px'
  },
  menuItem: {
    fontSize: '18px',
    fontWeight: 300,
    color: 'hsl(222, 16%, 43%)',
    textDecoration: 'none',
    margin: '5px 0',
    paddingLeft: '20px'
  },
  activeMenuItem: {
    color: 'hsl(23, 0%, 78%)',
    borderLeft: '1px solid hsl(15, 72%, 48%)'
  },
  btnFeedback: {
    marginBottom: '20px',
    alignSelf: 'center',
    background: 'hsla(0, 0%, 0%, 0)',
    border: '1px solid hsl(15, 75%, 60%)',
    fontSize: '12px',
    fontWeight: '900',
    padding: '6px 20px',
    borderRadius: '2px',
    color: 'hsl(15, 75%, 60%)',
    textTransform: 'uppercase',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      color: 'hsl(15, 85%, 70%)',
      borderColor: 'hsl(15, 85%, 70%)'
    }
  },
  tipjar: {
    color: 'hsl(180, 14%, 52%)',
    width: '90%',
    padding: '6px 10px',
    display: 'flex',
    fontSize: '11px',
    wordWrap: 'break-word',
    marginTop: '1px',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '400',
    alignItems: 'center',
    borderRadius: '2px',
    marginBottom: '7px',
    letterSpacing: '0.3px',
    justifyContent: 'center'
  },
  tipjarAddress: {
    color: 'hsl(180, 0%, 90%)',
    cursor: 'pointer',
    fontSize: '12px',
    marginLeft: '4px',
    textDecoration: 'none',
    background: 'hsla(0, 0%, 0%, 0.2)',
    padding: '5px 16px 8px',
    margin: '0 0 0 5px',
    borderRadius: '3px',
    '&::selection': {
      background: 'hsl(148, 41%, 40%)'
    },
    '& > .material-icons': {
      top: '-1px',
      position: 'relative',
      fontSize: '9px',
      left: '2px'
    }
  },
  roadmap: {
    color: 'hsl(192, 0%, 43%)',
    cursor: 'pointer',
    fontSize: '10px',
    background: 'hsla(0, 0%, 0%, 0)',
    alignSelf: 'center',
    marginBottom: '10px',
    paddingBottom: '0px',
    textDecoration: 'none',
    borderBottom: '1px solid hsl(192, 0%, 36%)',
    '&:hover': {
      color: 'hsl(192, 0%, 52%)',
      borderBottom: '1px solid hsl(192, 0%, 45%)',
    }
  },
  hide: {
    display: 'none'
  }
};

const withStyles = injectSheet(styles)(Navigation);

/* =============================================================================
=    Redux
============================================================================= */

const mapStateToProps = (state, ownProps) => ({
  isNavOpen: state.app.isNavOpen,
  pathname: ownProps.location
});
const mapDispatchToProps = dispatch => ({
  onClickFeedback: () => dispatch(openFeedback())
});
const connected = connect(mapStateToProps, mapDispatchToProps)(withStyles);

export default withRouter(connected);


/* =============================================================================
=    Selection function
============================================================================= */
function selectElementText(el, win) {
  win = win || window;
  var doc = win.document, sel, range;
  if (win.getSelection && doc.createRange) {
    sel = win.getSelection();
    range = doc.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (doc.body.createTextRange) {
    range = doc.body.createTextRange();
    range.moveToElementText(el);
    range.select();
  }
}
