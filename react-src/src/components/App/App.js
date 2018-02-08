import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableProduct from '../TableProduct/TableProduct';
import ModalProduct from '../ModalProduct/ModalProduct';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
      products: [],
      online: 0
    }

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleProductAdded = this.handleProductAdded.bind(this);
    this.handleProductUpdated = this.handleProductUpdated.bind(this);
    this.handleProductDeleted = this.handleProductDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchProducts();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleProductAdded(data));
    this.socket.on('update', data => this.handleProductUpdated(data));
    this.socket.on('delete', data => this.handleProductDeleted(data));
  }

  // Fetch data from the back-end
  fetchProducts() {
    axios.get(`${this.server}/api/products/`)
    .then((response) => {
      this.setState({ products: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleProductAdded(product) {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products: products });
  }

  handleProductUpdated(product) {
    let products = this.state.products.slice();
    for (let i = 0, n = products.length; i < n; i++) {
      if (products[i].id === product.id) {
        products[i].name = product.name;
        products[i].description = product.description;
        products[i].price = product.price;
        products[i].quantity = product.quantity;
        products[i].groupId = product.groupId;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ products: products });
  }

  handleProductDeleted(product) {
    let products = this.state.products.slice();
    products = products.filter(u => { return u.id !== product.id; });
    this.setState({ products: products });
  }

  render() {

    let online = this.state.online;
    let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
    let noun = (online <= 1) ? 'person' : 'people';

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>TEST ASSIGNMENT</h1>
          </div>
        </div>
        <Container>
          <ModalProduct
            headerTitle='Add Product'
            buttonTriggerTitle='Add New'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onProductAdded={this.handleProductAdded}
            server={this.server}
            socket={this.socket}
          />
          <em id='online'>{`${online} ${noun} ${verb} online.`}</em>
          <TableProduct
            onProductUpdated={this.handleProductUpdated}
            onProductDeleted={this.handleProductDeleted}
            products={this.state.products}
            server={this.server}
            socket={this.socket}
          />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
