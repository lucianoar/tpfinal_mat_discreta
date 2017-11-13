import React, {Component} from 'react';
import {CardHeader, CardText} from 'material-ui/Card';
import ExerciseCard from './misc/ExerciseCard';
import Divider from 'material-ui/Divider';
import snippets from '../snippets.js';

class ExerciseTemplate extends Component {
  state = {
    showCodeSnippet: false,
  };

  toggleCodeSnippet() {
    this.setState(state => {
      return {
        showCodeSnippet: !state.showCodeSnippet,
        ...state,
      };
    });
  }

  render() {
    const {exercise} = this.props;
    const {title = '', subtitle = '', snippet = '', name} = exercise;
    return (
      <div className="exercise-template">
        <div className="math-exercise">
          <ExerciseCard>
            <CardHeader
              title={title}
              subtitle={subtitle}
              actAsExpander={true}
              showExpandableButton={true}
              style={{paddingBottom: 0}}
            />
            <CardText expandable={true} style={{paddingTop: 0}}>
              <div className="code-snippet">
                {snippet !== '' && (
                  <div>
                    <h3>Código</h3>
                    <iframe
                      title="codeSnippet"
                      src={'data:text/html;base64,' + snippets[name]}
                      frameBorder="0"
                    />
                  </div>
                )}
              </div>
              <Divider />
            </CardText>
            <CardText>
              <exercise.component />
            </CardText>
          </ExerciseCard>
        </div>
      </div>
    );
  }
}

export default ExerciseTemplate;
