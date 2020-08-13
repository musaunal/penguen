import React, {Component} from 'react';
import Container from '@material-ui/core/Container';

class App extends Component {

  state = {
    products: [],
    product: {
      name: "Hava Pengueni",
      price: 15
    }
  }

componentDidMount(){
  this.getProducts()
}

getProducts = _ => {
  fetch("http://localhost:4000/product")
  .then(Response => Response.json())
  .then(Response => this.setState({products: Response.data}))
  .catch(err => console.log(err))
}

addProduct = _ => {
  const {product} = this.state
  fetch(`http://localhost:4000/product/add?Product_ID=${Math.random()*100}&Name=${product.name}&Price=${product.price}&Photo=zul&Stock=${product.price*10}&Star=${product.price*4}&Bonus=${product.price*2}`)
  .then(this.getProducts)
  .catch(err => console.error(err))
}

renderProduct = product => <div key={product.product_id}>
    {product.Name}, {product.Price}, {product.Photo}, {product.Stock}, {product.Star}, {product.Bonus}
  </div>

  render(){
    const {products, product} = this.state; 
    return (
      <Container >
        <div className="App">
          {products.map(this.renderProduct)}

          <div>
            <input 
              value={product.name} 
              onChange={e => this.setState({ product: { ...product, name: e.target.value}})} />
            <input 
              value={product.price}
              onChange={e => this.setState({ product: { ...product, price: e.target.value}})} 
            />
            <button onClick={this.addProduct}>Add Product</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default App;
