// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

type Props = {
  title: string,
  classes: Object,
  onClose: Function,
  children: Node,
  actions: Node | Node[],
  className?: string,
  hideFooter?: boolean
};

class Modal extends React.Component {
  props: Props;
  static defaultProps = {
    className: '',
    hideFooter: false
  }

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
    const { classes: c, title } = this.props;
    const close = (
      <i
        onClick={this.props.onClose}
        className={classNames('material-icons', c.close)}
      >close</i>
    );
    const actions = this.props.actions || (
      <button
        onClick={this.props.onClose}
        className={c.btnPrimary}
      >
        OK
      </button>
    );

    return (
      <div className={c.bg}>
        <div className={classNames(c.container, this.props.className)}>
          {close}
          <div className={classNames(c.title, 'Modal-title')}>
            {title}
          </div>
          <div className={c.body}>
            {this.props.children}
          </div>
          {!this.props.hideFooter &&
            <div className={c.footer}>
              {actions}
            </div>
          }
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
  title: {
    margin: '30px'
  },
  footer: {
    margin: '30px'
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
    display: 'flex',
    flexGrow: 2
  }
};

export default injectSheet(styles)(Modal);
