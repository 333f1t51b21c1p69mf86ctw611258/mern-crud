import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalProduct from '../ModalProduct/ModalProduct';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableProduct extends Component {

  render() {

    let products = this.props.products;

    products = products.map((product) => 
      <Table.Row key={product.id}>
        <Table.Cell>{product.name}</Table.Cell>
        <Table.Cell>{product.description}</Table.Cell>
        <Table.Cell>{product.price}</Table.Cell>
        <Table.Cell>{product.quantity}</Table.Cell>
        <Table.Cell>{product.groupId}</Table.Cell>
        <Table.Cell>
          <ModalProduct
            headerTitle='Edit Product'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            productID={product.id}
            onProductUpdated={this.props.onProductUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ModalConfirmDelete
            headerTitle='Delete Product'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            product={product}
            onProductDeleted={this.props.onProductDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new product appear on top of the list
    products =  [...products].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>GroupId</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products}
        </Table.Body>
      </Table>
    );
  }
}

export default TableProduct;
