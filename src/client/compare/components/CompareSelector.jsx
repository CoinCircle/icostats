import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { getColors } from '~/compare/helpers';
import CompareSelectorItem from './CompareSelectorItem';
import CompareSelectorAddNew from './CompareSelectorAddNew';

const propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

function CompareSelector({ classes, items, selected, onAdd, onRemove, colors }) {
  const nextColor = getColors(colors.length + 1)[colors.length];
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
        color={nextColor}
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
    flexWrap: 'wrap',
    flex: '0 1 auto',
    marginBottom: '10px',
    marginTop: '20px'
  }
};


export default injectSheet(styles)(CompareSelector);
