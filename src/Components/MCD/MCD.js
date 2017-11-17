import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';

const validateNumber = number => {
  const value = parseInt(number, 10);
  if (isNaN(value) || value < 1) {
    return {
      value: '',
      decimal: '',
      errorText: 'Debe ingresar un número binario',
    };
  } else {
    return {
      value: value,
      errorText: '',
    };
  }
};

class MCD extends React.PureComponent {
  state = {
    running: false,
    finished: false,
    disabled: true,
    dividend: '',
    divisor: '',
    remainder: '',
    steps: [],
    numbers: [
      {
        value: '',
        errorText: '',
      },
      {
        value: '',
        errorText: '',
      },
    ],
  };

  delay = 1000;

  validateNumbers = () => {
    const {numbers} = this.state;
    this.setState({
      disabled: numbers.some(n => isNaN(parseInt(n.value, 10))),
    });
  };

  changeNumber = (k, value) => {
    this.setState(state => {
      return (state.numbers[k] = value);
    }, this.validateNumbers);
  };

  start = () => {
    this.setState(
      state => {
        const [{value: n1}, {value: n2}] = state.numbers.sort(
          (n1, n2) => n2.value - n1.value,
        );
        const steps = [
          {
            dividend: n1,
            divisor: n2,
            remainder: n1 % n2,
            gcd: n2,
          },
        ];
        return {
          ...state,
          running: true,
          steps: steps,
          finished: false,
          ...steps[0],
        };
      },
      () => {
        window.setTimeout(this.tick, this.delay);
      },
    );
  };

  tick = () => {
    const {running, remainder} = this.state;
    if (remainder === 0 || !running) {
      this.setState({
        finished: true,
        running: false,
      });
    } else {
      this.setState(
        state => {
          const n1 = state.dividend;
          const n2 = state.divisor;
          let steps = state.steps;
          steps.push({
            dividend: n2,
            divisor: n1 % n2,
            remainder: n2 % (n1 % n2),
            gcd: n1 % n2 !== 0 ? n1 % n2 : state.remainder,
          });
          return {
            ...state,
            steps: steps,
            ...steps[steps.length - 1],
          };
        },
        () => {
          window.setTimeout(this.tick, this.delay);
        },
      );
    }
  };

  cancel = () => {
    this.setState({
      running: false,
    });
  };

  render() {
    const {numbers, running, disabled, steps, finished, gcd} = this.state;
    return (
      <div>
        {numbers.map((n, k) => (
          <div key={k}>
            <TextField
              type="number"
              floatingLabelText={`Número ${k + 1}`}
              value={n.value}
              errorText={n.errorText}
              onChange={ev =>
                this.changeNumber(k, validateNumber(ev.target.value))
              }
            />
          </div>
        ))}
        <RaisedButton
          label="Calcular"
          primary={true}
          disabled={disabled || running}
          onClick={this.start}
        />
        {running && (
          <RaisedButton
            label="Cancelar"
            primary={true}
            onClick={this.cancel}
            style={{marginLeft: '1rem'}}
          />
        )}
        <br />
        <br />
        <Divider />
        <br />
        <div>
          {running && (
            <div>
              <br />
              <LinearProgress />
              <br />
            </div>
          )}
          {steps.map((s, k) => (
            <div key={k} style={{margin: '1rem 0'}}>
              <b>Paso {k + 1}: </b>
              <div
                style={{
                  display: 'inline-block',
                  minWidth: '6rem',
                  textAlign: 'right',
                }}>
                {`${s.dividend} / ${s.divisor}`}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  minWidth: '2rem',
                  textAlign: 'center',
                }}>
                {` → `}
              </div>
              <div style={{display: 'inline-block', minWidth: '6rem'}}>
                {`Resto: ${s.remainder}`}
              </div>
            </div>
          ))}
        </div>
        {finished && (
          <div>
            <br />
            <Divider />
            <br />
            <b>Resultado:</b> MCD({numbers.map(n => n.value).join(',')}) es{' '}
            {gcd}
          </div>
        )}
      </div>
    );
  }
}

export default MCD;
