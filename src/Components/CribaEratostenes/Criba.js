import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import './CribaEratostenes.css';

const Criba = props => (
  <Card zDepth={0}>
    <CardText>
      <div className="container-criba">
        {props.criba.map((c, k) => {
          let className = 'item-criba ';
          if (c.compound) {
            className += 'compound ';
          }
          if (c.divisor) {
            className += `divisor-${c.divisor} `;
          }
          if (c.prime) {
            className += `prime-${c.value} `;
          }
          if (c.value === props.current) {
            className += `current-m`;
          }
          return (
            <span key={k} className={className}>
              {c.value}
            </span>
          );
        })}
      </div>
    </CardText>
  </Card>
);

export default Criba;
