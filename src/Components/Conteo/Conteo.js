import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import FlatButton from 'material-ui/FlatButton';
import Questions from './Questions';
import FormData from './FormData';
import TexEquation from './TexEquation.js';

import combination from './1_combinacion.svg';
import combination_repetition from './2_combinacion_repeticion.svg';
import variation from './3_variacion.svg';
import variation_repetition from './4_variacion_repeticion.svg';
import trivial_combination from './5_combinacion_trivial.svg';
import trivial_combination_repetition from './6_combinacion_trivial_repeticion.svg';
import permutation from './7_permutacion.svg';
import permutatation_repetition from './8_permutacion_repeticion.svg';

class Conteo extends PureComponent {
  state = {
    stepIndex: 0,
    elements: '',
    allElements: false,
    order: false,
    repetition: false,
    type: 0,
    solved: false,
  };

  types = [
    {
      title: 'Combinación de n grupos',
      img: combination,
    }, //MN
    {
      title: 'Combinación con repetición',
      img: combination_repetition,
    }, //MN
    {
      title: 'Variación sin repetición',
      img: variation,
    }, //MN
    {
      title: 'Variación con repetición',
      img: variation_repetition,
    }, //MN
    {
      title: 'Combinación trivial C(m,m) ',
      img: trivial_combination,
    }, //M
    {
      title: 'Combinación trivial con repetición',
      img: trivial_combination_repetition,
    }, //M
    {
      title: 'Permutación',
      img: permutation,
    }, //M
    {
      title: 'Permutación de varios elementos',
      img: permutatation_repetition,
    }, //MArray
  ];

  setType = () => {
    this.setState(state => {
      let type = 0;
      const {allElements, order, repetition} = state;
      type += allElements ? 4 : 0;
      type += order ? 2 : 0;
      type += repetition ? 1 : 0;
      return {
        type: type,
      };
    });
  };

  toggleAllElements = () => {
    this.setState(state => {
      return {
        allElements: !state.allElements,
      };
    }, this.setType);
  };

  toggleOrder = () => {
    this.setState(state => {
      return {
        order: !state.order,
      };
    }, this.setType);
  };

  toggleRepetition = () => {
    this.setState(state => {
      return {
        repetition: !state.repetition,
      };
    }, this.setType);
  };

  handleNext = () => {
    this.setState(state => {
      return {
        stepIndex: state.stepIndex + 1,
        finished: state.stepIndex >= 3,
      };
    });
  };

  handlePrev = () => {
    this.setState(state => {
      if (state.stepIndex > 0) {
        return {
          stepIndex: state.stepIndex - 1,
        };
      }
    });
  };

  renderStepActions = step => {
    const {stepIndex, solved} = this.state;
    return (
      <div style={{margin: '0.5rem 0'}}>
        {step > 0 && (
          <FlatButton
            label="Volver"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
          />
        )}
        <span> </span>
        {stepIndex > 2 ? (
          <RaisedButton
            label="Nuevo"
            labelPosition="after"
            primary={true}
            onClick={event => {
              event.preventDefault();
              this.setState({stepIndex: 0, finished: false});
            }}
            icon={<NavigationRefresh />}
            style={{marginRight: 12}}
          />
        ) : (
          <RaisedButton
            label={stepIndex === 2 ? 'Calcular' : 'Siguiente'}
            primary={true}
            onClick={this.handleNext}
            disabled={stepIndex === 2 && !solved}
            style={{marginRight: 12}}
          />
        )}
      </div>
    );
  };

  changeSolved = (solved, solution) => {
    if (solved) {
      this.setState({
        solved: true,
        solution: solution,
      });
    } else {
      this.setState({
        solved: false,
      });
    }
  };

  render() {
    const {stepIndex, type, solution} = this.state;
    return (
      <div>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Repeticion - Orden</StepLabel>
            <StepContent>
              <Card>
                <CardText>
                  <Questions
                    toggleAllElements={this.toggleAllElements}
                    toggleOrder={this.toggleOrder}
                    toggleRepetition={this.toggleRepetition}
                    {...this.state}
                  />
                </CardText>
                <CardActions>{this.renderStepActions(0)}</CardActions>
              </Card>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Formula a utilizar</StepLabel>
            <StepContent>
              <Card>
                <CardTitle title={this.types[type].title} />
                <CardText>
                  <TexEquation img={this.types[type].img} />
                </CardText>
                <CardActions>{this.renderStepActions(1)}</CardActions>
              </Card>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Datos</StepLabel>
            <StepContent>
              <Card>
                <CardText>
                  <FormData type={type} changeSolved={this.changeSolved} />
                </CardText>
                <CardActions>{this.renderStepActions(2)}</CardActions>
              </Card>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Solución</StepLabel>
            <StepContent>
              <Card>
                <CardText>
                  El resultado es: <b>{Math.floor(solution)}</b>
                </CardText>
                <CardActions>{this.renderStepActions(3)}</CardActions>
              </Card>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default Conteo;
