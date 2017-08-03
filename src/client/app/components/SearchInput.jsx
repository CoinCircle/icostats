// @flow
import React from 'react';
import injectSheet from 'react-jss';
import cx from 'classnames';
import { Motion, spring } from 'react-motion';

type Props = {
  classes: Object,
  className: string,
  sheet: any,
  value: string
};


class SearchInput extends React.Component {
  props: Props;
  state = {
    isOpen: false
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

  handleBlur = () => {
    if (!this.props.value && this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
  }

  renderInput = (interpolatedStyles) => {
    const { classes: c, className, sheet, ...rest } = this.props;
    const { isOpen } = this.state;
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
      top: '7px',
      left: '2px',
      color: 'hsl(0, 0%, 90%)',
      position: 'absolute',
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextStroke: '1px hsl(223, 20%, 25%)',
      cursor: 'pointer'
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
  }
};

export default injectSheet(styles)(SearchInput);
