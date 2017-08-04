// @flow
import React from 'react';
import injectSheet from 'react-jss';
import cx from 'classnames';
import { Motion, spring } from 'react-motion';

type Props = {
  classes: Object,
  className: string,
  sheet: any,
  value: string,
  tooltip: string
};


class SearchInput extends React.Component {
  props: Props;
  state = {
    isOpen: false,
    focus: false
  };

  handleExpand = () => {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true
      });
    }
  }

  handleCollapse = (event: MouseEvent) => {
    event.stopPropagation();
    this.setState({
      isOpen: false
    });
  }

  handleFocus = () => {
    this.setState({
      focus: true
    });
  }

  handleBlur = () => {
    if (!this.props.value && this.state.isOpen) {
      this.setState({
        isOpen: false,
        focus: false
      });
    }
  }

  renderTooltip() {
    const { classes: c, tooltip } = this.props;

    return (
      <div className={c.tooltip}>
        {tooltip}
      </div>
    )
  }

  renderInput = (interpolatedStyles) => {
    const { classes: c, className, sheet, tooltip, ...rest } = this.props;
    const { isOpen, focus } = this.state;
    const borderBottom = interpolatedStyles.borderBottom ?
      '1px solid hsl(0, 0%, 30%)' :
      'none';
    const input = (
      <input
        placeholder="Search"
        {...rest}
        type="text"
        className={c.input}
        style={{ borderBottom }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
    const iconSearch = (
      <i className="material-icons js-search">search</i>
    );
    const iconClose = (
      <i
        className="material-icons js-close"
        onClick={this.handleCollapse}
      >close</i>
    );

    return (
      <div
        className={cx(c.container, className, { 'is-open': isOpen })}
        style={{ width: interpolatedStyles.width }}
        onClick={this.handleExpand}
      >
        {input}
        {iconSearch}
        {isOpen && iconClose}
        {tooltip && focus && this.renderTooltip()}
      </div>
    );
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Motion
        style={{
          borderBottom: isOpen ? 1 : 0,
          width: spring(isOpen ? 180 : 22)
        }}
      >
        {this.renderInput}
      </Motion>
    );
  }
}

const styles = {
  container: {
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    '&.is-open': {
      cursor: 'default'
    },
    '& > .material-icons.js-search': {
      top: '6px',
      left: '-1px',
      color: 'hsl(201, 87%, 54%)',
      cursor: 'pointer',
      position: 'absolute',
      fontSize: '18px',
      WebkitFontSmoothing: 'antialiased'
    },
    '& > .material-icons.js-close': {
      position: 'absolute',
      top: '7px',
      right: '2px',
      color: 'hsl(0, 0%, 90%)',
      fontSize: '16px',
      WebkitTextStroke: '1px hsl(223, 20%, 25%)',
      cursor: 'pointer'
    }
  },
  input: {
    color: 'hsl(0, 0%, 100%)',
    width: '100%',
    border: 'none',
    height: '29px',
    outline: 'none',
    fontSize: '13px',
    background: 'none',
    fontWeight: '400',
    fontFamily: 'Montserrat',
    paddingLeft: '26px',
    borderBottom: '1px solid hsl(0, 0%, 30%)',
    boxSizing: 'border-box',
    caretColor: 'hsl(201, 87%, 54%)',
    '&::placeholder': {
      color: 'hsl(0, 0%, 80%)',
      fontWeight: 300
    }
  },
  tooltip: {
    maxWidth: '200px',
    height: 'auto',
    whiteSpace: 'unset',
    zIndex: '9',
    color: 'hsl(0, 0%, 85%)',
    fontSize: '10px',
    marginTop: '8px',
    lineHeight: '1.5em',
    padding: '10px 15px',
    position: 'relative',
    background: 'hsl(0, 0%, 7%)',
    MozBorderRadius: '3px',
    WebkitBorderRadius: '3px',
    borderRadius: '3px',
    MozBoxShadow: 'inset 0 1px 0px #111, inset 0 2px 0px #444, 0 3px 2px rgba(0, 0, 0, 0.6)',
    WebkitBoxShadow: 'inset 0 1px 0px #111, inset 0 2px 0px #444, 0 3px 2px rgba(0, 0, 0, 0.6)',
    boxShadow: 'inset 0 1px 0px #111, inset 0 2px 0px #444, 0 3px 2px rgba(0, 0, 0, 0.6)',
    '&:before': {
      content: '" "',
      height: '0',
      width: '0',
      position: 'absolute',
      left: '50%',
      top: '-14px',
      marginLeft: '-8px',
      border: '8px solid hsla(0, 0%, 0%, 0)',
      borderBottomColor: 'hsl(0, 0%, 7%)',
      zIndex: '1'
    }
  }
};

export default injectSheet(styles)(SearchInput);
