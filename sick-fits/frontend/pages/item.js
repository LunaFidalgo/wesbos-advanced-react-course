import React from 'react';
import SingleItem from '../components/styles/SingleItem';

const Item = ({ query }) => (
  <div>
    <SingleItem id={query.id} />
  </div>
);

export default Item;
