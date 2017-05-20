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
    backgroundColor: 'hsl(222, 21%, 20%)'
  },
  brand: {

  },
  logo: {
    margin: '20px'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column'
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
  }
};

const Navigation = ({ classes }) => (
  <div className={classes.container}>

    <div className={classes.brand}>
      <img src="/img/logo.svg" className={classes.logo} alt="logo" />
    </div>

    <div className={classes.menu}>
      <h3 className={classes.menuTitle}>Rankings</h3>
      <NavLink
        to="/"
        className={classNames({
          [classes.menuItem]: true,
          [classes.activeMenuItem]: true
        })}
      >ROI Since ICO</NavLink>
      <NavLink
        to="/"
        className={classes.menuItem}
      >ROI / Time</NavLink>
      <NavLink
        to="/"
        className={classes.menuItem}
      >Volatility</NavLink>
      <NavLink
        to="/"
        className={classes.menuItem}
      >Token Holders</NavLink>
      <NavLink
        to="/"
        className={classes.menuItem}
      >Locks</NavLink>
    </div>

  </div>
);

export default injectSheet(styles)(Navigation);
