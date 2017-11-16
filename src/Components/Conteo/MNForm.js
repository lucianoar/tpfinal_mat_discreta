import React from 'react';
import TextField from 'material-ui/TextField';
import {factorial, combinations, pow} from 'mathjs';

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

class MNForm extends React.PureComponent {
  state = {
    m: {
      number: '',
      errorText: '',
    },
    n: {
      number: '',
      errorText: '',
    },
  };

  verifyMN = (m, n) => {
    if (n > m) {
      this.setState(state => {
        return {
          n: {
            number: state.n.number,
            errorText: 'n debe ser mas chico que m',
          },
        };
      });
      throw Error('N must be less than M');
    }
  };

  solve = () => {
    const {type, changeSolved} = this.props;
    let r,
      {m, n} = this.state;
    m = parseInt(m.number, 10) || 0;
    n = parseInt(n.number, 10) || 0;
    try {
      if (m < 1 || n < 1) {
        throw Error('Incorrect numbers');
      }
      switch (type) {
        case 0: //Combination w/o repetition
          this.verifyMN(m, n);
          r = combinations(m, n);
          break;
        case 1: //Combination with repetition
          r = combinations(n + m - 1, n);
          break;
        case 2: //Variation
          this.verifyMN(m, n);
          r = factorial(m) / factorial(m - n);
          break;
        case 3: //Exponentation
          r = pow(m, n);
          break;
        default:
          throw Error('Incorrect type for MNForm');
      }
    } catch (e) {
      console.warn(e);
      changeSolved(false);
      return;
    }
    changeSolved(true, r);
  };

  render() {
    const {m, n} = this.state;
    return (
      <div>
        <TextField
          id="m"
          floatingLabelText="Número m"
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
        <br />{' '}
        <TextField
          id="n"
          floatingLabelText="Número n"
          type="number"
          value={n.number}
          errorText={n.errorText}
          onChange={ev =>
            this.setState(
              {n: validateNumber(ev.target.value)},
              this.solve.bind(null),
            )
          }
        />
      </div>
    );
  }
}

export default MNForm;
