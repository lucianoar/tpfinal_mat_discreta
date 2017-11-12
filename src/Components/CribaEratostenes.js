import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

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
    };

    this.delay = 200;

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
        },
        this.tick,
      );
    };

    this.tick = () => {
      const {m1, m2, number, raiz} = this.state;
      if (m1 > raiz) {
        this.setState({
          running: false,
        });
        return;
      }
      if (m2 > number / m1) {
        this.setState(
          state => {
            state.m1 = state.m1 + 1;
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
    const {number = null, errorText, firstRun, criba, running} = this.state;
    return (
      <div>
        <form>
          <TextField
            floatingLabelText="Ingrese un número:"
            value={number}
            errorText={errorText}
            onChange={this.changeNumber}
          />
          <br />
          <RaisedButton
            label="Calcular"
            primary={true}
            disabled={!number || running}
            onClick={this.start}
          />
        </form>
        <br />
        <Divider />
        {firstRun && <Criba criba={criba} />}
      </div>
    );
  }
}

const Criba = props => (
  <Card zDepth={0}>
    <CardHeader title="Resultado" />
    <CardText>
      {props.criba
        .filter(c => !c.compound)
        .map(c => <div key={c.value}>{JSON.stringify(c)}</div>)}
    </CardText>
    <CardActions style={{textAlign: 'right'}}>
      <FlatButton label="Cancelar" />
    </CardActions>
  </Card>
);

export default FormCriba;
