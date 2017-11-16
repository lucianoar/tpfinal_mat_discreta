import React from 'react';
import TextField from 'material-ui/TextField';

const validateNumber = number => {
  const value = parseInt(number, 2);
  if (isNaN(value) || value < 1) {
    return {
      value: '',
      decimal: '',
      errorText: 'Debe ingresar un número binario',
    };
  } else {
    return {
      value: value.toString(2),
      decimal: value.toString(10),
      errorText: '',
    };
  }
};

const FlexContainer = props => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
    {props.children}
  </div>
);

const FlexItem = props => (
  <div style={{flex: '1 1', textAlign: 'center'}}>{props.children}</div>
);

class SumaBinario extends React.Component {
  state = {
    numbers: [
      {
        value: '',
        decimal: '',
        errorText: '',
      },
      {
        value: '',
        decimal: '',
        errorText: '',
      },
    ],
  };

  changeNumber = (k, value) => {
    this.setState(state => {
      return (state.numbers[k] = value);
    });
  };

  render() {
    const {numbers} = this.state;
    const sum = numbers.reduce((sum, n) => sum + parseInt(n.value, 2), 0);
    const style = {width: '10rem', margin: '0 1rem'};
    const responseStyle = {
      display: 'inline-block',
      textAlign: 'right',
      fontWeight: 'bold',
      margin: '0 1rem',
      width: '10rem',
    };
    const inputStyle = {textAlign: 'right'};
    return (
      <div>
        <FlexContainer>
          <FlexItem>
            <h4>Sistema binario</h4>
            {numbers.map((n, k) => (
              <div key={k}>
                <TextField
                  type="number"
                  floatingLabelText={`Número binario ${k + 1}`}
                  value={n.value}
                  errorText={n.errorText}
                  style={style}
                  inputStyle={inputStyle}
                  onChange={ev =>
                    this.changeNumber(k, validateNumber(ev.target.value))
                  }
                />
              </div>
            ))}
            {!isNaN(sum) && (
              <div style={responseStyle}>Resultado: {sum.toString(2)}</div>
            )}
          </FlexItem>
          <FlexItem>
            <h4>Sistema decimal</h4>
            {numbers.map((n, k) => (
              <div key={k}>
                <TextField
                  type="number"
                  style={style}
                  inputStyle={inputStyle}
                  floatingLabelText={`Número decimal ${k + 1}`}
                  value={n.decimal}
                  disabled
                />
              </div>
            ))}
            {!isNaN(sum) && (
              <div style={responseStyle}>Resultado: {sum.toString(10)}</div>
            )}
          </FlexItem>
        </FlexContainer>
      </div>
    );
  }
}

export default SumaBinario;
