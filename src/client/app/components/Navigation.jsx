import React from 'react';
import { NavLink } from 'react-router-dom';
import injectSheet from 'react-jss';
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
};

const Navigation = ({ classes }) => (
  <div className={classes.container}>

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
    >Feedback</a>
  </div>
);

export default injectSheet(styles)(Navigation);
