import React from 'react';

const ExerciseTemplate = props => {
  let {exercise, component} = props;
  return (
    <div className="exercise-template">
      <div className="math-exercise">
        <h1>{exercise.title}</h1>
        <div className="exercise-content">{component}</div>
      </div>
      <div className="code-sample" />
    </div>
  );
};

export default ExerciseTemplate;
