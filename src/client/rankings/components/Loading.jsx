import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const Loading = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <div className={classNames(classes.title, classes.animated)} />
      <div className={classNames(classes.feedback, classes.animated)} />
    </div>
    <div className={classes.filters}>
      <div className={classNames(classes.filter, classes.animated)} />
      <div className={classNames(classes.filter, classes.animated)} />
      <div className={classNames(classes.filter, classes.animated)} />
      <div className={classNames(classes.filter, classes.animated)} />
      <div className={classNames(classes.filter, classes.animated)} />
    </div>
    <div className={classes.table}>
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
      <div className={classNames(classes.tr, classes.animated)} />
    </div>
  </div>
);

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    width: '70%',
    background: 'hsl(222, 21%, 28%)',
    height: '100%'
  },
  feedback: {
    width: '30%',
    background: 'hsl(222, 21%, 28%)',
    height: '100%',
    marginLeft: '40px'
  },
  header: {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px'
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '26px 10px',
    height: '70px'
  },
  filter: {
    height: '100%',
    width: '100%',
    background: 'hsl(222, 21%, 28%)',
    margin: '0 10px'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexGrow: 2,
    padding: '20px'
  },
  tr: {
    height: '25px',
    margin: '10px 10px',
    background: 'hsl(222, 21%, 28%)',
    width: '100%'
  },
  animated: {
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: 'placeHolderShimmer',
    animationTimingFunction: 'linear',
    background: 'hsl(222, 19%, 29%)',
    background: 'linear-gradient(to right, hsl(222, 21%, 28%) 8%, hsl(222, 21%, 30%) 18%, hsl(222, 21%, 28%) 33%)',
    backgroundSize: '800px 104px',
    position: 'relative'
  },
  '@keyframes placeHolderShimmer': {
    from: {
      backgroundPosition: '-468px 0'
    },
    to: {
      backgroundPosition: '468px 0'
    }
  }
};

export default injectSheet(styles)(Loading);
