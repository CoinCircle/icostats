// @flow
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import compare from 'compare';

type Props = {
  onAdd: Function,
  items: Array<Object>,
  color: string,
  classes: Object
};

type State = {
  focus: boolean,
  value: string,
  searchResult: any
}

class CompareSelectorAddNew extends React.Component {
  props: Props;
  state: State;
  inputRef: HTMLInputElement;

  state = {
    focus: false,
    value: '',
    searchResult: null
  };

  handleClick = () => {
    if (!this.state.focus) {
      this.setState({ focus: true }, () => this.inputRef.focus());
    }
  }

  handleSearch() {
    const { value } = this.state;
    const regex = new RegExp(`^${value.toLowerCase()}`);
    const match = this.props.items.find(item =>
       regex.test(item.name.toLowerCase())
     );

    if (match && value) {
      this.setState({ searchResult: match });
    } else {
      this.setState({ searchResult: null });
    }
  }

  handleKeyUp = (event: Event) => {
    if (event.key === 'Enter') {
      this.handleBlur();
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value }, this.handleSearch);
  }

  handleBlur = () => {
    if (this.state.searchResult) {
      this.props.onAdd(this.state.searchResult.ticker);
    }
    this.setState({ focus: false, value: '', searchResult: null });
  }

  render() {
    const { classes, onAdd, color } = this.props;
    const add = !this.state.focus && (
      <i className={classNames('material-icons', classes.add)}>add</i>
    );
    const input = this.state.focus && (
      <input
        className={classes.input}
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        ref={(c) => { this.inputRef = c; }}
      />
    );
    const searchResult = this.state.searchResult && (
      <span className={classes.searchResult}>
        {this.state.searchResult.name.toLowerCase()}
      </span>
    );
    const dot = this.state.focus && (
      <div className={classes.dot} style={{ background: color }} />
    );
    const tabCatcher = <div tabIndex="0" />;

    return (
      <div
        className={classNames(classes.container, {
          [classes.containerActive]: this.state.focus
        })}
        onClick={this.handleClick}
      >
        {dot}
        {input}
        {searchResult}
        {add}
        {tabCatcher /* prevent address bar receiving the next 'tab' */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAdd: ticker => dispatch(compare.actions.addTicker(ticker))
});

const Container = connect(null, mapDispatchToProps)(CompareSelectorAddNew);

const styles = {
  container: {
    position: 'relative',
    width: '160px',
    color: 'hsl(225, 7%, 79%)',
    height: '40px',
    border: '1px dashed hsl(220, 8%, 68%)',
    display: 'flex',
    fontSize: '11px',
    background: 'hsla(224, 11%, 0%, 0.1)',
    alignItems: 'center',
    borderRadius: '5px',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover > .material-icons': {
      color: 'hsla(0, 0%, 100%, 0.9)'
    }
  },
  add: {
    fontWeight: 'lighter',
    color: 'hsla(0, 0%, 100%, 0.6)',
    fontSize: '14px'
  },
  input: {
    color: 'hsl(225, 7%, 79%)',
    border: 'none',
    outline: 'none',
    background: 'none',
    marginLeft: '11px'
  },
  searchResult: {
    position: 'absolute',
    left: '33px',
    color: 'hsl(220, 50%, 100%)',
    opacity: '0.3'
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '100%',
    background: 'hsl(0, 100%, 50%)',
    marginLeft: '15px',
    flex: '0 0 7px'
  },
};

export default injectSheet(styles)(Container);
