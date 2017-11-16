import React from 'react';
import Paper from 'material-ui/Paper';

const TexEquation = props => {
  return (
    <div style={{marginLeft: '1rem'}}>
      <Paper style={{textAlign: 'center', maxWidth: 400, padding: '1rem'}}>
        <small>
          <i>Fórmula de resolución</i>
        </small>
        <br />
        <br />
        <img style={{height: '3rem'}} src={props.img} alt="" />
      </Paper>
    </div>
  );
};

export default TexEquation;
