import React from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import snippets from "../snippets.js";

const ExerciseTemplate = props => {
  const { exercise } = props;
  const { title = "", subtitle = "", snippet = "", name } = exercise;
  return (
    <div className="exercise-template">
      <div className="math-exercise">
        <Card>
          <CardHeader title={title} subtitle={subtitle} />
          <CardText>
            <exercise.component />
          </CardText>
        </Card>
      </div>
      <div className="code-snippet">
        {snippet !== "" && (
          <iframe
            title="codeSnippet"
            src={"data:text/html;base64," + snippets[name]}
            frameBorder="0"
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseTemplate;
