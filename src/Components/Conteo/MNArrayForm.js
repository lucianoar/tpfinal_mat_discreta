import React from 'react';
import TextField from 'material-ui/TextField';
import {factorial} from 'mathjs';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

class MNArrayForm extends React.Component {
  state = {
    nk: [
      {
        number: '',
        errorText: '',
      },
      {
        number: '',
        errorText: '',
      },
    ],
  };
  solve = () => {
    const {type, changeSolved} = this.props;
    let r,
      {nk} = this.state;
    try {
      switch (type) {
        case 7: //Permutacion de varios
          r =
            factorial(nk.reduce((sum, n) => sum + n.number, 0)) /
            nk.reduce((sum, n) => sum * factorial(n.number), 1);
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

  handleNChange = (n, k) => {
    this.setState(state => {
      state.nk[k] = n;
      return state;
    }, this.solve.bind(null));
  };

  addN = () => {
    this.setState(state => {
      state.nk.push({
        number: '',
        errorText: '',
      });
      return state;
    });
  };

  render() {
    const {nk} = this.state;
    let addLabel = (
      <span>
        Agregar n<sub>{nk.length + 1}</sub>
      </span>
    );
    return (
      <div>
        <FlatButton
          icon={<ContentAdd />}
          label={addLabel}
          labelPosition="after"
          onClick={this.addN}
        />
        <br />
        {nk.map((n, k) => {
          let label = (
            <span>
              Número n<sub>{k + 1}</sub>
            </span>
          );
          return (
            <div key={k}>
              <TextField
                id={'n_' + k}
                floatingLabelText={label}
                type="number"
                value={n.number}
                errorText={n.errorText}
                onChange={ev => {
                  this.handleNChange(validateNumber(ev.target.value), k);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MNArrayForm;
