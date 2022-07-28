import React from 'react';
import Card from 'react-bootstrap/Card';
import Stats from './Icons/Stats';
export const StatsCard = (props) => {
  const { variant, title, quantity } = props;
  return (
    <Card
      bg={variant.toLowerCase()}
      key={variant}
      text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
      className="col col-sm-6 col-lg-4"
    >
      <Card.Body>
      <Card.Title>Total {title}</Card.Title>
      <div className="row">
        <div className="col d-flex flex-column justify-content-center">
          <p className='fs-1 m-0'>{quantity}</p>
        </div>
        <div className="col-auto">
          <Stats width="80px"/>
        </div>
      </div>
      </Card.Body>
    </Card>
  );
};
