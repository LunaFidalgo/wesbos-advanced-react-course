import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String!
    $largeImage: String!
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends React.Component {
  state = {
    title: 'Cool Shoes',
    description: 'I Love them!',
    image: '',
    largeImage: '',
    price: 150,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;

    const parsedValue = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: parsedValue });
  };

  uploadFile = async (event) => {
    console.log('uploading file...');
    const { files } = event.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const response = await fetch('', {
      method: 'POST',
      body: data,
    });
    const file = await response.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    const { title, price, description, image } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await createItem();
              Router.push({
                pathname: '/item',
                query: { id: response.data.createItem.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {image && <img src={image} alt="upload preview" />}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={description}
                  onChange={this.handleChange}
                />
              </label>
            </fieldset>
            <button type="submit">Submit! </button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
