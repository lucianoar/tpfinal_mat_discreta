import React from 'react';
import Toggle from 'material-ui/Toggle';

const Questions = props => {
  const {
    allElements = false,
    order = false,
    repetition = false,
    toggleAllElements,
    toggleOrder,
    toggleRepetition,
  } = props;
  return (
    <div>
      <Toggle
        label={(allElements ? 'E' : 'No e') + 'ntran todos los elementos'}
        labelPosition="right"
        toggled={allElements}
        onToggle={toggleAllElements}
      />
      <br />
      <Toggle
        label={(order ? 'I' : 'No i') + 'mporta el orden de los elementos'}
        labelPosition="right"
        toggled={order}
        onToggle={toggleOrder}
      />
      <br />
      <Toggle
        label={(repetition ? 'S' : 'No s') + 'e repiten elementos'}
        labelPosition="right"
        toggled={repetition}
        onToggle={toggleRepetition}
      />
    </div>
  );
};

export default Questions;
