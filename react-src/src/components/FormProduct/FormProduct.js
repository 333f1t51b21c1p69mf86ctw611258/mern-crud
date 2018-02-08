import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const groupOptions = [];

class FormProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      price: '',
      quantity: '',
      groupId: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get(`${this.props.server}/api/product_groups/`)
      .then((response) => {
        const product_groups = response.data;
        for (let index = 0; index < product_groups.length; index++) {
          const element = product_groups[index];

          groupOptions.push({
            key: element.code,
            text: element.name,
            value: element.id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Fill in the form with the appropriate data if product id is provided
    if (this.props.productID) {
      axios.get(`${this.props.server}/api/products/${this.props.productID}`)
        .then((response) => {
          this.setState({
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            quantity: (response.data.quantity === null) ? '' : response.data.quantity,
            groupId: response.data.groupId,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ groupId: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const product = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      groupId: this.state.groupId
    }

    // Acknowledge that if the product id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.productID ? 'put' : 'post';
    const params = this.props.productID ? this.props.productID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/products/${params}`,
      data: product
    })
      .then((response) => {
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.msg
        });

        if (!this.props.productID) {
          this.setState({
            name: '',
            description: '',
            price: '',
            quantity: '',
            groupId: ''
          });
          this.props.onProductAdded(response.data.result);
          this.props.socket.emit('add', response.data.result);
        }
        else {
          this.props.onProductUpdated(response.data.result);
          this.props.socket.emit('update', response.data.result);
        }

      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: err.response.data.msg
            });
          }
        }
        else {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: 'Something went wrong. ' + err
          });
        }
      });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          type='text'
          placeholder='Name'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Description'
          type='text'
          placeholder='Description'
          name='description'
          maxLength='40'
          required
          value={this.state.description}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Price'
          type='text'
          placeholder='Price'
          name='price'
          maxLength='10'
          required
          value={this.state.price}
          onChange={this.handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
            label='Quantity'
            type='number'
            placeholder='Quantity'
            min={0}
            max={99999}
            name='quantity'
            required
            value={this.state.quantity}
            onChange={this.handleInputChange}
          />
          <Form.Field
            control={Select}
            label='Group'
            options={groupOptions}
            placeholder='Group'
            value={this.state.groupId}
            onChange={this.handleSelectChange}
          />
        </Form.Group>
        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormProduct;
