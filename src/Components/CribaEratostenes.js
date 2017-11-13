import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Card, CardText} from 'material-ui/Card';

class FormCriba extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
      raiz: '',
      errorText: '',
      firstRun: false,
      running: false,
      criba: [],
      m1: 2,
      m2: 2,
      answer: '',
    };

    this.delay = 0;

    this.changeNumber = ev => {
      const value = parseInt(ev.target.value, 10);
      let state = {};
      if (value) {
        state = {
          number: value,
          errorText: '',
        };
      } else {
        state = {
          number: '',
          errorText: 'Debe ingresar un número',
        };
      }
      this.setState(state);
    };

    this.initCriba = number => {
      const criba = [];
      for (let i = 2; i <= number; i++) {
        criba[i] = {
          value: i,
          compound: false,
        };
      }
      return criba;
    };

    this.markNumber = (number, prevState) => {
      prevState.criba[number].compound = true;
      return prevState;
    };

    this.start = () => {
      const {number} = this.state;
      if (!number) return;
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

    this.cancel = () => {
      this.setState({
        running: false,
        m1: 2,
        m2: 2,
      });
    };

    this.tick = () => {
      const {m1, m2, number, raiz, running, criba} = this.state;
      if (!running || m1 > raiz) {
        let answer = '';
        if (running) {
          const n = criba[number].compound ? ' no ' : '';
          answer = `El numero ${number}${n} es primo`;
        }
        this.setState({
          running: false,
          answer: answer,
        });
        return;
      }
      if (m2 > number / m1) {
        this.setState(
          state => {
            const nextPrime = state.criba.filter(
              c => !c.compound && c.value > state.m1,
            )[0].value;
            state.m1 = nextPrime;
            state.m2 = state.m1;
            return state;
          },
          () => {
            window.setTimeout(this.tick, this.delay);
          },
        );
      } else {
        this.setState(
          state => {
            const {m1, m2} = state;
            state.criba[m1 * m2].compound = true;
            state.m2 = m2 + 1;
            return state;
          },
          () => {
            window.setTimeout(this.tick, this.delay);
          },
        );
      }
    };
  }

  render() {
    const {
      number = null,
      errorText,
      firstRun,
      criba,
      running,
      answer,
    } = this.state;
    return (
      <div>
        <form>
          <TextField
            floatingLabelText="Ingrese un número:"
            value={number}
            errorText={errorText}
            disabled={running}
            onChange={this.changeNumber}
          />
          <br />
          <RaisedButton
            label="Calcular"
            primary={true}
            disabled={!number || running}
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
        {firstRun && <Criba criba={criba} running={running} />}
      </div>
    );
  }
}

const Criba = props => (
  <Card zDepth={0}>
    <CardText>
      <div className="container-criba">
        {props.criba.map(c => {
          let className = 'item-criba ';
          if (c.compound) {
            className += 'compound ';
          }
          return (
            <span key={c.value} className={className}>
              {c.value}
            </span>
          );
        })}
      </div>
    </CardText>
  </Card>
);

export default FormCriba;
