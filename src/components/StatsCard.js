import React from 'react';
import Card from 'react-bootstrap/Card';

export const StatsCard = (props) => {
  const { variant, header, title, description } = props;
  return (
    <Card
      bg={variant.toLowerCase()}
      key={variant}
      text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: '18rem' }}
      className="mt-2"
    >
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title>{variant} Card Title </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the
          card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
