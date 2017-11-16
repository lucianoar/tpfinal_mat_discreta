import React from 'react';
import TextField from 'material-ui/TextField';
import {factorial, combinations} from 'mathjs';

const validateNumber = number => {
  const value = parseInt(number, 10);
  if (isNaN(value) || value < 1) {
    return {
      number: '',
      errorText: 'Debe ingresar un número natural',
    };
  } else {
    return {
      number: value,
      errorText: '',
    };
  }
};

class MForm extends React.PureComponent {
  state = {
    m: {
      number: '',
      errorText: '',
    },
  };

  solve = () => {
    const {type, changeSolved} = this.props;
    let r,
      {m} = this.state;
    m = parseInt(m.number, 10) || 0;
    try {
      if (m < 1) {
        throw Error('Incorrect numbers');
      }
      switch (type) {
        case 4: //Combinacion trivial
          r = 1;
          break;
        case 5: //Combinacion trivial con repetición
          r = combinations(2 * m - 1, m);
          break;
        case 6: //Permutation
          r = factorial(m);
          break;
        default:
          throw Error('Incorrect type for NForm');
      }
    } catch (e) {
      console.warn(e);
      changeSolved(false);
      return;
    }
    changeSolved(true, r);
  };

  render() {
    const {m} = this.state;
    return (
      <div>
        <TextField
          id="m"
          floatingLabelText="Numero m"
          type="number"
          value={m.number}
          errorText={m.errorText}
          onChange={ev =>
            this.setState(
              {m: validateNumber(ev.target.value)},
              this.solve.bind(null),
            )
          }
        />
      </div>
    );
  }
}

export default MForm;
