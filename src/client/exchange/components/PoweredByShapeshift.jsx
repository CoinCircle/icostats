// @flow
import React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object
};

function PoweredByShapeshift({ classes }: Props) {
  return (
    <div className={classes.container}>
      Powered By
      <img
        alt="shapeshift"
        src="https://shapeshift.io/logo.svg"
        className={classes.imgShapeshift}
      />
    </div>
  );
}

const styles = {
  container: {
    fontSize: '7px',
    display: 'flex',
    width: '150px',
    alignItems: 'flex-end',
    color: 'hsl(0, 0%, 80%)',
    textTransform: 'uppercase',
    opacity: 0.5,
    flexGrow: 2
  },
  imgShapeshift: {
    maxHeight: '19px',
    marginLeft: '5px'
  },
};

export default injectSheet(styles)(PoweredByShapeshift);
