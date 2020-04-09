import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gpl from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

const ALL_ITEMS_QUERY = gpl`
  query ALL_ITEMS_QUERY {
    items {
    id
    title
    price
    description
    image
    largeImage
  }
}

`;

const Center = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error{error.message}</p>;

            console.log(data);
            return (
              <ItemList>
                {data.items.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemList>
            );
          }}
        </Query>
      </Center>
    );
  }
}
