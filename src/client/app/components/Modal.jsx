// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

type Props = {
  title: string,
  classes: Object,
  onClose: Function,
  children: Node
};

class Modal extends React.Component {
  props: Props;

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmout() {
    document.removeEventListener('keyup', this.handleKeyup);
  }

  handleKeyup = (event: Event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    const { classes, title } = this.props;
    const close = (
      <i
        onClick={this.props.onClose}
        className={classNames('material-icons', classes.close)}
      >close</i>
    );

    return (
      <div className={classes.bg}>
        <div className={classes.container}>
          {close}
          <div className={classes.title}>
            {title}
          </div>
          <div className={classes.body}>
            {this.props.children}
          </div>
          <div className={classes.footer}>
            <button
              onClick={this.props.onClose}
              className={classes.btnPrimary}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: 'hsl(0, 0%, 100%)',
    width: '500px',
    height: '300px',
    borderRadius: '3px',
    padding: '30px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bg: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    background: 'hsla(0, 0%, 0%, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9
  },
  btnPrimary: {
    background: 'none',
    float: 'right',
    border: '1px solid hsl(0, 0%, 20%)',
    borderRadius: '3px',
    textTransform: 'uppercase',
    fontWeight: '500',
    padding: '5px 33px',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      background: 'hsl(0, 0%, 20%)',
      color: 'white'
    }
  },
  close: {
    top: '10px',
    right: '10px',
    position: 'absolute',
    fontSize: '15px',
    cursor: 'pointer'
  },
  body: {
    flexGrow: 2
  }
};

export default injectSheet(styles)(Modal);
