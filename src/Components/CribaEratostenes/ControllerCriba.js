import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Criba from './Criba.js';

class ControllerCriba extends Component {
  state = {
    number: '',
    raiz: '',
    errorText: '',
    firstRun: false,
    running: false,
    disabled: true,
    criba: [],
    m1: 2,
    m2: 2,
    answer: '',
  };

  delay = 0;
  max = 2000;

  validateNumber = number => {
    const value = parseInt(number, 10);
    if (isNaN(value)) {
      return {
        number: '',
        errorText: 'Debe ingresar un número entero',
        disabled: true,
      };
    } else if (value < 2) {
      return {
        number: value,
        errorText: 'El número debe ser mayor o igual a 2',
        disabled: true,
      };
    } else if (value > this.max) {
      return {
        number: this.max,
        errorText: 'El número es muy grande para generar una animación',
        disabled: true,
      };
    } else {
      return {
        number: value,
        errorText: '',
        disabled: false,
      };
    }
  };

  changeNumber = ev => {
    this.setState(this.validateNumber(ev.target.value));
  };

  initCriba = number => {
    const criba = [{}];
    for (let i = 2; i <= number; i++) {
      criba[i] = {
        value: i,
        compound: false,
        prime: false,
      };
    }
    return criba;
  };

  start = () => {
    const {number} = this.state;
    if (!number || number < 2) return;
    this.setState(
      {
        m1: 2,
        m2: 2,
        firstRun: true,
        raiz: Math.floor(Math.sqrt(number)),
        criba: this.initCriba(number),
        running: true,
        answer: '',
      },
      this.tick,
    );
  };

  cancel = () => {
    this.setState({
      running: false,
      m1: 2,
      m2: 2,
    });
  };

  tick = () => {
    const {m1, m2, number, raiz, running, criba} = this.state;
    if (!running || m1 > raiz) {
      let answer = '';
      if (running) {
        answer = `El numero ${number}${
          criba[number].compound ? ' no ' : ''
        } es primo`;
      }
      this.setState({
        running: false,
        answer: answer,
      });
      return;
    } else if (m2 > number / m1) {
      this.setState(
        state => {
          state.m1 = state.criba.filter(
            c => !c.compound && c.value > state.m1,
          )[0].value;
          state.m2 = state.m1;
          state.criba[m1].prime = true;
          return state;
        },
        () => {
          window.setTimeout(this.tick, this.delay);
        },
      );
    } else if (criba[m1 * m2].compound) {
      this.setState(state => {
        state.m2++;
        return state;
      }, this.tick);
    } else {
      this.setState(
        state => {
          const {m1, m2} = state;
          state.criba[m1 * m2].compound = true;
          state.criba[m1 * m2].divisor = m1;
          state.m2 = m2 + 1;
          return state;
        },
        () => {
          window.setTimeout(this.tick, this.delay);
        },
      );
    }
  };

  render() {
    const {
      number = null,
      errorText,
      firstRun,
      criba,
      running,
      disabled,
      answer,
      m1,
    } = this.state;
    return (
      <div>
        <form action="">
          <TextField
            floatingLabelText="Ingrese un número:"
            value={number}
            errorText={errorText}
            disabled={running}
            onChange={this.changeNumber}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                this.start();
              }
            }}
          />
          <br />
          <RaisedButton
            label="Calcular"
            primary={true}
            disabled={disabled || running}
            onClick={this.start}
          />
          {running && (
            <span>
              <span> </span>
              <RaisedButton
                label="Cancelar"
                primary={true}
                onClick={this.cancel}
              />
            </span>
          )}
        </form>
        <br />
        <Divider />
        {answer !== '' && (
          <div>
            <p>
              <b>Resultado: </b> {answer}
            </p>
            <Divider />
          </div>
        )}
        {firstRun && <Criba criba={criba} running={running} current={m1} />}
      </div>
    );
  }
}

export default ControllerCriba;
