import React from 'react';
import { NavLink } from 'react-router-dom';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import classNames from 'classnames';

const styles = {
  container: {
    height: '100%',
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    boxShadow: '3px 0px 10px hsla(0, 0%, 0%, 0.5)',
    backgroundColor: 'hsl(222, 21%, 20%)',
    justifyContent: 'space-between'
  },
  brand: {

  },
  logo: {
    margin: '20px'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2
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
    wordWrap: 'break-word',
    textAlign: 'left',
    padding: '6px 10px',
    fontSize: '9px',
    fontWeight: '400',
    color: 'hsl(0, 0%, 63%)',
    marginTop: '1px',
    borderRadius: '2px',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '10px'
  },
  tipjarAddress: {
    color: 'hsl(0, 0%, 51%)',
    textDecoration: 'none',
    '&:hover': {
      color: 'hsl(220, 50%, 60%)',
      textDecoration: 'underline'
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

const Navigation = ({ classes, isNavOpen = true }) => (
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
      >ROI Since ICO</NavLink>
      <NavLink
        to="/roi-over-time"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >ROI / Time</NavLink>
      <NavLink
        to="/vs-eth"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >ICO v.s. ETH</NavLink>
      <NavLink
        to="/vs-btc"
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
      >ICO v.s. BTC</NavLink>
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

    <a
      className={classes.btnFeedback}
      href="https://cooperm1.typeform.com/to/VYgHPt"
      target="_blank"
      rel="noopener noreferrer"
    >Feedback</a>

    <a
      href="https://trello.com/b/UnsBjG3k"
      target="_blank"
      rel="noopener noreferrer"
      className={classes.roadmap}
    >
      Trello Roadmap
    </a>

    <div className={classes.tipjar}>
      <span className={classes.tipjarTitle}>
        Tipjar:{' '}
      </span>
      <a
        href="https://etherscan.io/address/0x2B981863A0FBf4e07c8508623De8Bd6d4b28419C"
        className={classes.tipjarAddress}
      >
        0x2B981863A0FBf4e07c8508623De8Bd6d4b28419C
      </a>
    </div>
  </div>
);

const withStyles = injectSheet(styles)(Navigation);

const mapStateToProps = (state, ownProps) => ({
  isNavOpen: state.app.isNavOpen,
  pathname: ownProps.location
});
const connected = connect(mapStateToProps)(withStyles);
import { withRouter } from 'react-router-dom';

export default withRouter(connected);
