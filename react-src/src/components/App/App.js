import React, { Component } from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableProduct from '../TableProduct/TableProduct';
import ModalProduct from '../ModalProduct/ModalProduct';
import GridProduct from '../GridProduct/GridProduct';

// import logo from '../../logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
      products: [],
      online: 0,
      activeItem: 'product'
    }

    this.fetchProductGroups = this.fetchProductGroups.bind(this);
    this.fetchProductsByGroupId = this.fetchProductsByGroupId.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleProductAdded = this.handleProductAdded.bind(this);
    this.handleProductUpdated = this.handleProductUpdated.bind(this);
    this.handleProductDeleted = this.handleProductDeleted.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClick_Group = this.handleItemClick_Group.bind(this);

    this.handleProductBought = this.handleProductBought.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchProductGroups();
    this.fetchProducts();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleProductAdded(data));
    this.socket.on('update', data => this.handleProductUpdated(data));
    this.socket.on('delete', data => this.handleProductDeleted(data));
  }

  fetchProductGroups() {
    axios.get(`${this.server}/api/product_groups/`)
      .then((response) => {
        const product_groups = response.data;
        let productGroups = [];
        for (let index = 0; index < product_groups.length; index++) {
          const element = product_groups[index];

          productGroups.push({
            key: element.id,
            text: element.name,
            value: element.id,
          });
        }

        this.setState({ productGroups: productGroups });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchProductsByGroupId(groupId) {
    if (groupId) {
      axios.get(`${this.server}/api/products/groupId/${groupId}`)
        .then((response) => {
          this.setState({ productsByGroupId: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleProductBought(groupId) {
    this.fetchProductsByGroupId(groupId);
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

  handleItemClick_Group(e, { name, children }) {
    this.handleItemClick(e, { name });

    this.setState({ activeItemName: children });
    this.fetchProductsByGroupId(name);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    let online = this.state.online;
    let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
    let noun = (online <= 1) ? 'person' : 'people';

    const { activeItem } = this.state;

    let jsxGroups;
    if (this.state && this.state.productGroups) {
      jsxGroups = this.state.productGroups.map((productGroup) => {
        return <Menu.Item key={productGroup.key}
          name={productGroup.value.toString()}
          active={activeItem === productGroup.value.toString()}
          onClick={this.handleItemClick_Group}>
          {productGroup.text}
        </Menu.Item>
      });
    }

    let jsxContent;
    if (this.state && this.state.activeItem) {
      switch (this.state.activeItem) {
        case 'product':
          jsxContent = <div>
            <ModalProduct
              headerTitle='Add Product'
              buttonTriggerTitle='Add New'
              buttonSubmitTitle='Add'
              buttonColor='green'
              onProductAdded={this.handleProductAdded}
              server={this.server}
              socket={this.socket}
            />
            <span>
              <label htmlFor="file" className="ui icon button">
                  <i className="file icon"></i>
                  Upload CSV</label>
              <input type="file" id="file" className="hidden" />
            </span>
            <em id='online'>{`${online} ${noun} ${verb} online.`}</em>
            <TableProduct
              onProductUpdated={this.handleProductUpdated}
              onProductDeleted={this.handleProductDeleted}
              products={this.state.products}
              server={this.server}
              socket={this.socket}
            />
          </div>;
          break;

        default:
          jsxContent = <div>
            <GridProduct
              onProductBought={this.handleProductBought}
              products={this.state.productsByGroupId}
              selectedGroupId={this.state.activeItem}
              selectedGroupName={this.state.activeItemName}
              server={this.server}
            />
          </div>;
          break;
      }
    }

    return (
      <div>
        {/* <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>TEST ASSIGNMENT</h1>
          </div>
        </div> */}
        <Container>
          <div className='pusher'>
            <div className='full height'>
              <div className='toc'>
                <Menu className='inverted vertical left fixed'>
                  <Menu.Item name='product' active={activeItem === 'product'} onClick={this.handleItemClick}>
                    <Icon name='edit' />
                    Product
                  </Menu.Item>

                  <Menu.Item>
                    Group
                    <Icon name='grid layout' />
                    <Menu.Menu>
                      {jsxGroups}
                    </Menu.Menu>
                  </Menu.Item>
                </Menu>
              </div>
              <div className='article'>
                {jsxContent}
              </div>
            </div>
          </div>
        </Container>
        <br />
      </div>
    );
  }
}

export default App;
