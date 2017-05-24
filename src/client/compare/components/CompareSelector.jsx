import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import CompareSelectorItem from './CompareSelectorItem';
import CompareSelectorAddNew from './CompareSelectorAddNew';

const propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

function CompareSelector({ classes, items, selected, onAdd, onRemove, colors }) {

  return (
    <div className={classes.container}>
      {selected.map((ticker, i) => (
        <CompareSelectorItem
          color={colors[i]}
          key={ticker}
          ticker={ticker}
        />
      ))}
      <CompareSelectorAddNew
        color={colors[items.length]}
        items={items}
        selected={selected}
        onAdd={onAdd}
      />
    </div>
  );
}

CompareSelector.propTypes = propTypes;

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};


export default injectSheet(styles)(CompareSelector);
