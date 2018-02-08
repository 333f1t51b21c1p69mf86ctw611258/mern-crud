import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import axios from 'axios';

import image from '../../image.png';

class GridProduct extends Component {
  constructor() {
    super();

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    axios({
      method: 'put',
      responseType: 'json',
      url: `${this.props.server}/api/products/buy/${name}`
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const selectedGroupName = this.props.selectedGroupName;

    let rows = [];
    const products = this.props.products;
    if (products !== undefined) {
      for (let index = 0; index < products.length; index += 1) {
        let columns = [];

        let element = products[index];
        columns.push(<Grid.Column key={'' + index}>
          <div className='product'>
            <h4>{element.name}</h4>
            <Image src={image} />
            <p>${element.price}</p>
            <Button color='green' name={element.id} onClick={this.handleItemClick}>Buy</Button>
          </div>
        </Grid.Column>);

        index += 1;
        if (index < products.length) {
          element = products[index];
          columns.push(<Grid.Column key={'' + index}>
            <div className='product'>
              <h4>{element.name}</h4>
              <Image src={image} />
              <p>${element.price}</p>
              <Button color='green' name={element.id} onClick={this.handleItemClick}>Buy</Button>
            </div>
          </Grid.Column>);
        }

        index += 1;
        if (index < products.length) {
          element = products[index];
          columns.push(<Grid.Column key={'' + index}>
            <div className='product'>
              <h4>{element.name}</h4>
              <Image src={image} />
              <p>${element.price}</p>
              <Button color='green' name={element.id} onClick={this.handleItemClick}>Buy</Button>
            </div>
          </Grid.Column>);
        }

        rows.push(<Grid.Row key={'' + index}>{columns}</Grid.Row>);
      }
    }

    return (
      <div>
        <h1>{selectedGroupName}</h1>
        <Grid columns={3} divided>
          {rows}
        </Grid>
      </div>
    );
  }
}

export default GridProduct;
