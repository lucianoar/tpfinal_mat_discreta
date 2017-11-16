import React from 'react';
import TextField from 'material-ui/TextField';

const validateNumber = number => {
  const value = parseInt(number, 10);
  if (isNaN(value) || value < 1) {
    return {
      value: '',
      errorText: 'Debe ingresar un número natural',
    };
  } else {
    return {
      value: value.toString(10),
      errorText: '',
    };
  }
};

const FlexContainer = props => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'left',
    }}>
    {props.children}
  </div>
);

const FlexItem = props => (
  <div style={{flex: '1 1', textAlign: 'center'}}>{props.children}</div>
);

const NumberInBase = props => {
  let value = parseInt(props.value, 10)
    .toString(props.base)
    .toUpperCase();
  if (isNaN(parseInt(value, props.base))) value = '-';
  return (
    <FlexItem>
      <div style={{margin: '1rem'}}>
        <b>{props.title}: </b>
        <span>
          {value} <sub>{props.base}</sub>
        </span>
      </div>
    </FlexItem>
  );
};

class CambioBase extends React.Component {
  state = {
    number: {
      value: '',
      errorText: '',
    },
  };

  changeNumber = value => {
    this.setState(state => {
      return (state.number = value);
    });
  };

  render() {
    const {number} = this.state;
    const style = {width: '15rem', margin: '0 1rem'};
    const inputStyle = {textAlign: 'right'};
    return (
      <div>
        <FlexContainer>
          <FlexItem>
            <div>
              <TextField
                type="number"
                floatingLabelText="Numero decimal"
                value={number.value}
                errorText={number.errorText}
                style={style}
                inputStyle={inputStyle}
                onChange={ev =>
                  this.changeNumber(validateNumber(ev.target.value))
                }
              />
            </div>
            <NumberInBase value={number.value} base={8} title="Número octal" />
            <NumberInBase
              value={number.value}
              base={16}
              title="Número hexadecimal"
            />
          </FlexItem>
        </FlexContainer>
      </div>
    );
  }
}

export default CambioBase;
