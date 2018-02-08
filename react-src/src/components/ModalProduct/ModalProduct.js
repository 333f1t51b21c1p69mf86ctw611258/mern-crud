import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormProduct from '../FormProduct/FormProduct';

class ModalProduct extends Component {
  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormProduct
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            productID={this.props.productID}
            onProductAdded={this.props.onProductAdded}
            onProductUpdated={this.props.onProductUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalProduct;
