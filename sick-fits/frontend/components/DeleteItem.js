import React, { Component } from 'react';
import gpl from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gpl`
  mutation DELETE_ITEM_MUTATION($id: ID!){
    deleteItem(id: $id){
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(
      (item) => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { id, children } = this.props;

    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.update}
      >
        {(deleteItem, { error }) => {
          if (error)
            return (
              <p> there was an error deleting your item: {error.message}</p>
            );
          return (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this item?')) {
                  deleteItem();
                }
              }}
            >
              {children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
